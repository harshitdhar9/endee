from fastapi import FastAPI
from app.routers import health
from app.routers import db_test
from app.routers import auth
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User
from app.db.postgres import engine, Base

app = FastAPI(
    title="Kohabit API",
    version="1.0.0"
)

@app.on_event("startup")
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(db_test.router)
app.include_router(auth.router)
