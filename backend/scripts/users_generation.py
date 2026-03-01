import asyncio
import random
import uuid
from faker import Faker

from app.db.postgres import AsyncSessionLocal
from app.models.user import User
from app.core.embedding import generate_embedding
from app.core.vector import upsert_vector, ensure_index

fake = Faker()

INTERESTS = ["Sports", "Music", "Travel", "Reading", "Gaming",
             "Cooking", "Fitness", "Art", "Technology", "Movies"]

PETS = ["Dog", "Cat", "Bird", "Rabbit"]

MUSIC = ["Rock", "Pop", "Jazz", "Classical",
         "EDM", "Hip-Hop", "Indie", "Country"]

MOVIES = ["Action", "Comedy", "Drama", "Horror",
          "Romance", "Sci-Fi", "Thriller", "Animation"]

LOOKING_FOR = ["Friends", "Roommates", "Networking", "Dating"]

COMMUNICATION = ["Calls", "Texts", "Video Chat"]

PERSONALITY = ["Introvert", "Extrovert", "Ambivert"]

DIET = ["Vegetarian", "Vegan", "Non-Vegetarian", "Keto"]


def random_subset(lst, min_items=1, max_items=3):
    return random.sample(lst, random.randint(min_items, min(max_items, len(lst))))

async def create_user():
    name = fake.name()
    email = fake.unique.email()

    auth_user_id = uuid.uuid4()  

    budget = random.randint(400, 2500)
    age = random.randint(18, 35)
    sleep_type = random.choice(["Morning", "Night"])
    interests = random_subset(INTERESTS)

    preferences = {
        "age": age,
        "city": fake.city(),
        "diet": random_subset(DIET),
        "pets": random_subset(PETS),
        "sleep": sleep_type,
        "gender": random.choice(["Male", "Female"]),
        "aboutMe": fake.sentence(nb_words=10),
        "lookingFor": random_subset(LOOKING_FOR),
        "musicTypes": random_subset(MUSIC),
        "occupation": fake.job(),
        "movieGenres": random_subset(MOVIES),
        "personality": random.choice(PERSONALITY),
        "communication": random_subset(COMMUNICATION),
    }

    social_links = {
        "instagram": fake.url(),
        "discord": fake.user_name(),
        "twitter": fake.url()
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
            social_links=social_links,
            onboarding_done=True
        )

        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)

    profile_text = f"""
    Budget: {budget}
    Age: {age}
    Sleep Type: {sleep_type}
    Interests: {', '.join(interests)}
    About Me: {preferences['aboutMe']}
    Personality: {preferences['personality']}
    Looking For: {', '.join(preferences['lookingFor'])}
    Music: {', '.join(preferences['musicTypes'])}
    Movies: {', '.join(preferences['movieGenres'])}
    """

    embedding = generate_embedding(profile_text)
    upsert_vector(new_user.id, embedding)

    print(f"Created + Embedded: {email}")


async def main():
    ensure_index()
    for i in range(100):
        print(f"Creating user {i+1}/100")
        await create_user()


if __name__ == "__main__":
    asyncio.run(main())