# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, onboarding
from app.database import Base, engine

# ✅ Create all database tables
#Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# ✅ Initialize FastAPI app
app = FastAPI(title="Kohabit Backend")

# ✅ Allow frontend access (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.2.2:3000",  # Add this for Next.js Turbopack
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(auth,tags=["Auth"])
app.include_router(onboarding, tags=["Onboarding"])

# ✅ Root endpoint (optional)
@app.get("/")
def root():
    return {"message": "Kohabit API is running 🚀"}
