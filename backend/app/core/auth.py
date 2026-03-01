from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.supabase import supabase
from app.db.postgres import AsyncSessionLocal
from app.models.user import User
from sqlalchemy import select

security = HTTPBearer()
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    try:
        user_response = supabase.auth.get_user(token)
        if not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid token")
        auth_user_id = user_response.user.id
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(User).where(User.auth_user_id == auth_user_id)
            )
            db_user = result.scalar_one_or_none()
            if not db_user:
                raise HTTPException(status_code=404, detail="User not found")
        return db_user
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")