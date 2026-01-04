from fastapi import APIRouter, HTTPException, status, Depends
from backend.models.user import User, UserLogin
from backend.utils.auth import get_password_hash, verify_password, create_access_token
from backend.database.mongodb import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter()

@router.post("/register")
async def register(user: User, db: AsyncIOMotorDatabase = Depends(get_db)):
    existing = await db.users.find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    await db.users.insert_one(user_dict)
    return {"msg": "User registered successfully"}

@router.post("/login")
async def login(user: UserLogin, db: AsyncIOMotorDatabase = Depends(get_db)):
    db_user = await db.users.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
