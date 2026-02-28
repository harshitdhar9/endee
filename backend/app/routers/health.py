from fastapi import APIRouter
from fastapi import FastAPI
router=APIRouter(prefix="/health",tags=["health"])
@router.get("/")
def health_check():
    return {'status':'ok','message':'Kohabit backend running'}