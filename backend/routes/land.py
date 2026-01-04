from fastapi import APIRouter, Depends, HTTPException
from backend.models.land import Land
from backend.database.mongodb import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter()

@router.post("/add")
async def add_land(land: Land, db: AsyncIOMotorDatabase = Depends(get_db)):
    await db.lands.insert_one(land.dict())
    return {"msg": "Land added successfully"}

@router.get("/search")
async def search_land(location: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    lands = await db.lands.find({"location": location}).to_list(100)
    return lands

@router.get("/{land_id}")
async def get_land(land_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    land = await db.lands.find_one({"land_id": land_id})
    if not land:
        raise HTTPException(status_code=404, detail="Land not found")
    return land

@router.put("/{land_id}")
async def update_land(land_id: str, land: Land, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await db.lands.update_one({"land_id": land_id}, {"$set": land.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Land not found or not updated")
    return {"msg": "Land updated successfully"}

@router.delete("/{land_id}")
async def delete_land(land_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await db.lands.delete_one({"land_id": land_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Land not found")
    return {"msg": "Land deleted successfully"}
