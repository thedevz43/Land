import asyncio
from database.mongodb import db

async def add_test_data():
    # Add test user (with simple hashed password)
    user = {
        "username": "testuser",
        "email": "test@example.com",
        "hashed_password": "$2b$12$test_hash_placeholder"
    }
    await db.users.insert_one(user)
    print("✓ Test user added")
    
    # Add test land
    land = {
        "land_id": "LAND001",
        "owner": "testuser",
        "location": "Delhi",
        "area": 500.0,
        "details": "Test land property in Delhi"
    }
    await db.lands.insert_one(land)
    print("✓ Test land added")
    
    land2 = {
        "land_id": "LAND002",
        "owner": "testuser",
        "location": "Mumbai",
        "area": 750.0,
        "details": "Commercial property in Mumbai"
    }
    await db.lands.insert_one(land2)
    print("✓ Second test land added")
    
    print("\n✅ Database 'bharat_bhumi' created with test data!")
    print("Refresh MongoDB Compass to see the database.")

if __name__ == "__main__":
    asyncio.run(add_test_data())
