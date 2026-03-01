from fastapi import APIRouter, HTTPException
from app.schemas.user import UserSignup
from app.models.user import User
from app.db.postgres import AsyncSessionLocal
from app.core.supabase import supabase
import uuid
from app.schemas.user import UserSignin
from sqlalchemy import select

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
async def signup(user: UserSignup):
    try:
        print("🔹 Incoming signup request:", user.email)
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
        })

        print("🔹 Supabase response:", response)

        if not response.user:
            raise HTTPException(
                status_code=400,
                detail="Supabase user creation failed"
            )

        auth_user_id = uuid.UUID(response.user.id)
        async with AsyncSessionLocal() as session:
            new_user = User(
                auth_user_id=auth_user_id,
                name=user.name,
                email=user.email
            )
            session.add(new_user)
            await session.commit()

        print(" User stored in local DB")

        access_token = (
            response.session.access_token
            if response.session
            else None
        )

        return {
            "message": "User created successfully",
            "access_token": access_token,
        }

    except Exception as e:
        print("Signup error:", str(e))
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/signin")
async def signin(user: UserSignin):
    try:
        print("🔹 Incoming signin request:", user.email)
        response = supabase.auth.sign_in_with_password({
            "email": user.email,
            "password": user.password
        })

        if not response.user:
            raise HTTPException(status_code=400, detail="Invalid credentials")

        auth_user_id = response.user.id
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(User).where(User.auth_user_id == auth_user_id)
            )
            db_user = result.scalar_one_or_none()

            if not db_user:
                raise HTTPException(status_code=404, detail="User profile not found")
        return {
            "message": "Login successful",
            "access_token": response.session.access_token,
            "user": {
                "id": db_user.id,
                "name": db_user.name,
                "email": db_user.email
            }
        }
    except Exception as e:
        print("Signin error:", e)
        raise HTTPException(status_code=400, detail=str(e))