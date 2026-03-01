from fastapi import APIRouter, Depends
from sqlalchemy import update
from app.schemas.user import OnboardingUpdate
from app.models.user import User
from app.db.postgres import AsyncSessionLocal
from app.core.auth import get_current_user

router = APIRouter(prefix="/user", tags=["User"])


@router.put("/onboarding")
async def complete_onboarding(
    data: OnboardingUpdate,
    current_user: User = Depends(get_current_user)
):
    async with AsyncSessionLocal() as session:
        await session.execute(
            update(User)
            .where(User.id == current_user.id)
            .values(
                budget=data.budget,
                age=data.age,
                sleep_type=data.sleep_type,
                interests=data.interests,
                preferences=data.preferences,
                social_links=data.social_links,
                onboarding_done=True
            )
        )
        await session.commit()

    return {"message": "Onboarding completed successfully"}