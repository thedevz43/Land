from fastapi import APIRouter, Depends
from database.mongodb import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter()

@router.get("/")
async def get_dashboard(db: AsyncIOMotorDatabase = Depends(get_db)):
    total_lands = await db.lands.count_documents({})
    total_users = await db.users.count_documents({})
    recent_activity = []  # You can implement activity logs if needed
    return {
        "total_lands": total_lands,
        "total_users": total_users,
        "recent_activity": recent_activity
    }
