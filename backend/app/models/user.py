from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.db.postgres import Base
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    auth_user_id = Column(UUID(as_uuid=True), unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    budget = Column(Integer, nullable=True)
    age = Column(Integer, nullable=True)
    sleep_type = Column(String, nullable=True)
    interests = Column(JSONB, nullable=True)
    preferences = Column(JSONB, nullable=True)
    social_links = Column(JSONB, nullable=True)
    onboarding_done = Column(Boolean, default=False)
    embedding_id = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())