from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

# --- Create SQLAlchemy engine ---
# Example DATABASE_URL in .env:
# postgresql+psycopg2://user:password@localhost/db_name
# or sqlite:///./test.db

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # keeps connection alive
)

# --- Create SessionLocal for DB transactions ---
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- Base class for models ---
Base = declarative_base()

# --- Dependency for FastAPI routes ---
def get_db():
    """
    Provides a database session for each request
    and ensures it's closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
