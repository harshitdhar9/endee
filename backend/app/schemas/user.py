from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str | None = None
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str | None = None
    email: EmailStr

    model_config={
        "from_attributes": True
    }

class Token(BaseModel):
    access_token: str
    token_type: str
