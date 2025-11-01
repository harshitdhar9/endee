from sqlalchemy import Column, Integer, String, Float, JSON, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Onboarding(Base):
    __tablename__ = "onboarding"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    budget = Column(Float, nullable=True)
    age = Column(Integer, nullable=True)
    schedule = Column(String, nullable=True)
    interests = Column(JSON, nullable=True)
    pets = Column(JSON, nullable=True)
    music_types = Column(JSON, nullable=True)
    movie_types = Column(JSON, nullable=True)
    city = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    occupation = Column(String, nullable=True)
    looking_for = Column(JSON, nullable=True)
    communication = Column(JSON, nullable=True)
    personality = Column(String, nullable=True)
    diet = Column(JSON, nullable=True)
    about_me = Column(Text, nullable=True)
    social_links = Column(JSON, nullable=True)

    user = relationship("User", back_populates="onboarding")
