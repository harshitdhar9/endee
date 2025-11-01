from app import models

def create_onboarding(db, onboarding, user_id: int):
    db_data = models.Onboarding(**onboarding.dict(), user_id=user_id)
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data
