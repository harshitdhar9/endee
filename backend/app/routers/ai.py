from fastapi import APIRouter, Depends
from app.core.embedding import generate_embedding
from app.core.vector import upsert_vector
from app.core.auth import get_current_user
from app.models.user import User
from sqlalchemy.future import select
from app.db.postgres import AsyncSessionLocal
from app.core.vector import client, INDEX_NAME

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/embed-profile")
async def embed_profile(current_user: User = Depends(get_current_user)):

    prefs = current_user.preferences or {}

    profile_text = f"""
    Age: {current_user.age}
    Budget: {current_user.budget}
    Sleep Type: {current_user.sleep_type}
    Diet: {', '.join(prefs.get('diet', []))}
    Pets: {', '.join(prefs.get('pets', []))}
    Gender: {prefs.get('gender')}
    Occupation: {prefs.get('occupation')}
    Personality: {prefs.get('personality')}
    Communication Style: {', '.join(prefs.get('communication', []))}
    Looking For: {', '.join(prefs.get('lookingFor', []))}
    Music Preferences: {', '.join(prefs.get('musicTypes', []))}
    Movie Genres: {', '.join(prefs.get('movieGenres', []))}
    About Me: {prefs.get('aboutMe')}
    Interests: {', '.join(current_user.interests or [])}
    """

    embedding = generate_embedding(profile_text)
    upsert_vector(current_user.id, embedding)

    return {"message": "Profile embedded successfully"}

@router.get("/match")
async def match_users(current_user: User = Depends(get_current_user)):

    print(" Current user ID:", current_user.id)

    current_city = (
        current_user.preferences.get("city")
        if current_user.preferences else None
    )

    print(" Current city:", current_city)

    index = client.get_index(name=INDEX_NAME)
    current_vector = index.get_vector(str(current_user.id))

    if not current_vector:
        print(" No embedding found")
        return {"message": "Embedding not found for user"}

    results = index.query(
        vector=current_vector["vector"],
        top_k=30,  
        ef=128
    )

    if not results:
        return []

    matched = [
        item for item in results
        if int(item["id"]) != current_user.id
    ]

    if not matched:
        return []

    matched_ids = [int(item["id"]) for item in matched]

    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(User).where(User.id.in_(matched_ids))
        )
        users = result.scalars().all()

    same_city_users = [
        user for user in users
        if user.preferences
        and user.preferences.get("city") == current_city
    ]

    print(" Users after city filter:", same_city_users)

    response = []
    for user in same_city_users:
        similarity = next(
            item["similarity"]
            for item in matched
            if int(item["id"]) == user.id
        )

        response.append({
            "id": user.id,
            "name": user.name,
            "age": user.age,
            "city": current_city,
            "interests": user.interests,  
            "match_score": round(similarity * 100, 2)
})

    print(" FINAL RESPONSE:", response)

    return response