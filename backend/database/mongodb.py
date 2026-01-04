from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import Depends

MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.bharat_bhumi

def get_db():
    return db
