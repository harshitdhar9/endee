from fastapi import APIRouter, Depends
from app.core.embedding import generate_embedding
from app.core.vector import upsert_vector
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/embed-profile")
async def embed_profile(current_user: User = Depends(get_current_user)):
    # Build profile text
    profile_text = f"""
    Name: {current_user.name}
    Budget: {current_user.budget}
    Age: {current_user.age}
    Sleep Type: {current_user.sleep_type}
    Interests: {current_user.interests}
    Preferences: {current_user.preferences}
    """

    # Generate embedding
    embedding = generate_embedding(profile_text)

    # Store in Endee
    upsert_vector(current_user.id, embedding)

    return {"message": "Profile embedded successfully"}