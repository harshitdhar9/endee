from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
class UserSignin(BaseModel):
    email: EmailStr
    password: str
class OnboardingUpdate(BaseModel):
    budget: Optional[int]
    age: Optional[int]
    sleep_type: Optional[str]
    interests: Optional[List[str]]
    preferences: Optional[Dict[str, Any]]
    social_links: Optional[Dict[str, Any]]