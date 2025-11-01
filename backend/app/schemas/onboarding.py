# app/schemas/onboarding.py
from pydantic import BaseModel
from typing import List, Optional, Dict

class OnboardingCreate(BaseModel):
    budget: Optional[float]
    age: Optional[int]
    schedule: Optional[str]
    interests: Optional[List[str]]
    pets: Optional[List[str]]
    music_types: Optional[List[str]]
    movie_types: Optional[List[str]]
    city: Optional[str]
    gender: Optional[str]
    occupation: Optional[str]
    looking_for: Optional[List[str]]
    communication: Optional[List[str]]
    personality: Optional[str]
    diet: Optional[List[str]]

    # 🆕 Step 3 fields
    about_me: Optional[str]
    social_links: Optional[Dict[str, str]]  # {"instagram": "...", "linkedin": "..."}

class OnboardingResponse(OnboardingCreate):
    id: int
    model_config={
        "from_attributes": True
    }
