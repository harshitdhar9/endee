from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import get_db
from app.utils.jwt import decode_access_token
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

@router.post("/", response_model=schemas.OnboardingResponse)
def create_onboarding_data(
    data: schemas.OnboardingCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    return crud.create_onboarding(db=db, onboarding=data, user_id=user_id)
