from app.db.postgres import AsyncSessionLocal
from sqlalchemy import text
from fastapi import APIRouter
router = APIRouter(prefix="/db", tags=["db"])
@router.get("/test")
async def test_db():
    async with AsyncSessionLocal() as session:
        result = await session.execute(text("SELECT current_database();"))
        return {
            "status": "connected",
            "database": result.scalar()
        }