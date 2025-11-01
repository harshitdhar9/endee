from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, onboarding
from app.database import Base, engine

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Kohabit Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.2.2:3000", 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth,tags=["Auth"])
app.include_router(onboarding, tags=["Onboarding"])

@app.get("/")
def root():
    return {"message": "Kohabit API is running 🚀"}
