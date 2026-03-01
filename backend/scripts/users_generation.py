import asyncio
import random
import uuid
from faker import Faker

from app.db.postgres import AsyncSessionLocal
from app.models.user import User
from app.core.embedding import generate_embedding
from app.core.vector import upsert_vector, ensure_index

fake = Faker()

CITY = "Delhi"
TOTAL_USERS = 100

INTERESTS = [
    "Sports", "Music", "Travel", "Reading", "Gaming",
    "Cooking", "Fitness", "Art", "Technology", "Movies",
    "Photography", "Hiking", "Coding", "Anime", "Startups"
]

PERSONALITY = ["Introvert", "Extrovert", "Ambivert"]
DIET = ["Vegetarian", "Vegan", "Non-Vegetarian"]
LOOKING_FOR = ["Friends", "Roommates", "Networking"]


def random_subset(lst, min_items=1, max_items=4):
    return random.sample(lst, random.randint(min_items, min(max_items, len(lst))))


async def create_user(index_number: int):
    name = fake.name()
    email = f"delhi_{index_number}_{uuid.uuid4().hex[:6]}@demo.com"
    auth_user_id = uuid.uuid4()

    budget = random.randint(6000, 35000)
    age = random.randint(18, 35)
    sleep_type = random.choice(["Morning", "Night"])
    interests = random_subset(INTERESTS, 2, 5)

    preferences = {
        "city": CITY,
        "diet": random_subset(DIET),
        "personality": random.choice(PERSONALITY),
        "lookingFor": random_subset(LOOKING_FOR),
    }

    async with AsyncSessionLocal() as session:
        new_user = User(
            auth_user_id=auth_user_id,
            name=name,
            email=email,
            budget=budget,
            age=age,
            sleep_type=sleep_type,
            interests=interests,
            preferences=preferences,
            social_links={},
            onboarding_done=True
        )

        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)

    profile_text = f"""
    {name} is {age} years old living in Delhi.
    Budget: {budget}.
    Sleep Type: {sleep_type}.
    Interests: {', '.join(interests)}.
    Personality: {preferences['personality']}.
    Looking For: {', '.join(preferences['lookingFor'])}.
    Diet: {', '.join(preferences['diet'])}.
    """

    embedding = generate_embedding(profile_text)
    upsert_vector(new_user.id, embedding)

    print(f"User Created + Embedded: {email}")

    await asyncio.sleep(0.02)


async def main():
    ensure_index()

    print(f"\nGenerating {TOTAL_USERS} Delhi users...\n")

    for i in range(TOTAL_USERS):
        await create_user(i)

    print("\n100 Delhi Users Created & Embedded Successfully!")


if __name__ == "__main__":
    asyncio.run(main())