import asyncio
from database.mongodb import db
import random
from datetime import datetime

# Indian first names
first_names = [
    "Rajesh", "Priya", "Amit", "Sneha", "Vikram", "Anjali", "Arjun", "Deepika",
    "Suresh", "Kavya", "Karthik", "Lakshmi", "Arun", "Divya", "Mahesh", "Pooja",
    "Ramesh", "Suma", "Ganesh", "Meera", "Krishna", "Sowmya", "Prakash", "Anu",
    "Sanjay", "Rekha", "Venkat", "Nandini", "Ravi", "Sowmya", "Satish", "Swathi",
    "Varun", "Shreya", "Ashok", "Padma", "Mohan", "Latha", "Naveen", "Geetha",
    "Harish", "Neha", "Chandra", "Maya", "Praveen", "Kavitha", "Kumar", "Shanti",
    "Anand", "Radha", "Manoj", "Usha", "Anil", "Savita", "Kishore", "Preeti",
    "Vijay", "Nirmala", "Sandeep", "Shruthi", "Raghav", "Archana", "Nikhil", "Bhavana",
    "Sachin", "Vani", "Girish", "Shilpa", "Bhaskar", "Yamuna", "Gopal", "Indira"
]

# Indian last names
last_names = [
    "Kumar", "Sharma", "Reddy", "Rao", "Nair", "Iyer", "Menon", "Joshi",
    "Hegde", "Shetty", "Gowda", "Murthy", "Sastry", "Varma", "Pillai", "Naik",
    "Kulkarni", "Desai", "Patil", "Patel", "Singh", "Gupta", "Agarwal", "Chopra",
    "Malhotra", "Kapoor", "Bhat", "Kamath", "Pai", "Shenoy", "Rao", "Raman"
]

# Bengaluru areas/localities
bengaluru_areas = [
    "Koramangala", "Whitefield", "Indiranagar", "Jayanagar", "HSR Layout",
    "Electronic City", "Marathahalli", "Bellandur", "Sarjapur Road", "Bannerghatta Road",
    "Yelahanka", "Hebbal", "RT Nagar", "Malleshwaram", "Basavanagudi",
    "JP Nagar", "BTM Layout", "Hosur Road", "Old Airport Road", "Kormangala",
    "MG Road", "Brigade Road", "Richmond Town", "Frazer Town", "Cox Town",
    "Cunningham Road", "Residency Road", "Shivajinagar", "Rajajinagar", "Vijayanagar",
    "Majestic", "Yeshwanthpur", "Peenya", "Jalahalli", "Nagarbhavi",
    "Kengeri", "Rajarajeshwari Nagar", "Uttarahalli", "Banashankari", "Girinagar",
    "JP Nagar", "Bilekahalli", "Hulimavu", "Begur", "Bommanahalli",
    "Silk Board", "Madiwala", "BTM", "Arekere", "HSR Layout"
]

# Land types and purposes
land_types = [
    "Residential Plot", "Commercial Plot", "Agricultural Land", "Villa Plot",
    "Apartment Site", "Industrial Plot", "Mixed Use Land", "Farm Land"
]

# Street types
streets = [
    "Main Road", "Cross Road", "Layout", "Extension", "Phase", "Block",
    "Street", "Avenue", "Circle", "Ring Road"
]

async def generate_synthetic_data():
    print("Starting synthetic data generation for Bengaluru...")
    
    # Clear existing data
    await db.users.delete_many({})
    await db.lands.delete_many({})
    print("Cleared existing data")
    
    # Generate 100 users
    users_list = []
    for i in range(1, 101):
        first = random.choice(first_names)
        last = random.choice(last_names)
        username = f"{first.lower()}.{last.lower()}{i}"
        email = f"{first.lower()}.{last.lower()}{i}@gmail.com"
        
        user = {
            "username": username,
            "email": email,
            "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "secret123"
            "full_name": f"{first} {last}",
            "phone": f"+91{random.randint(7000000000, 9999999999)}",
            "created_at": datetime.utcnow().isoformat()
        }
        users_list.append(user)
    
    await db.users.insert_many(users_list)
    print(f"Added {len(users_list)} users")
    
    # Generate 200 land records
    lands_list = []
    for i in range(1, 201):
        area_name = random.choice(bengaluru_areas)
        land_type = random.choice(land_types)
        street = random.choice(streets)
        
        # Generate realistic area in square feet
        if "Agricultural" in land_type or "Farm" in land_type:
            area_sqft = random.randint(5000, 50000)
        elif "Commercial" in land_type:
            area_sqft = random.randint(1000, 10000)
        elif "Industrial" in land_type:
            area_sqft = random.randint(5000, 25000)
        else:  # Residential
            area_sqft = random.randint(600, 5000)
        
        # Generate survey number (typical format in India)
        survey_no = f"{random.randint(1, 999)}/{random.randint(1, 9)}"
        
        # Generate realistic price per sqft (in INR)
        if area_name in ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout"]:
            price_per_sqft = random.randint(5000, 15000)
        elif area_name in ["Electronic City", "Marathahalli", "Sarjapur Road"]:
            price_per_sqft = random.randint(4000, 10000)
        else:
            price_per_sqft = random.randint(2500, 8000)
        
        total_price = area_sqft * price_per_sqft
        
        # Random owner from our users
        owner_name = f"{random.choice(first_names)} {random.choice(last_names)}"
        
        land = {
            "land_id": f"BLR-{area_name[:3].upper()}-{i:04d}",
            "owner": owner_name,
            "location": f"{area_name}, Bengaluru",
            "full_address": f"Survey No. {survey_no}, {random.randint(1, 999)} {street}, {area_name}, Bengaluru - {random.randint(560001, 560110)}",
            "area": area_sqft,
            "area_unit": "sqft",
            "land_type": land_type,
            "survey_number": survey_no,
            "price_per_sqft": price_per_sqft,
            "total_price": total_price,
            "currency": "INR",
            "details": f"{land_type} in prime {area_name} location. Well-connected with metro, schools, and shopping centers. Clear title with BBMP approval.",
            "zone": "Residential" if "Residential" in land_type else "Commercial" if "Commercial" in land_type else "Agricultural",
            "bbmp_approved": random.choice([True, True, True, False]),  # 75% approved
            "electricity": random.choice([True, True, False]),
            "water_connection": random.choice([True, True, False]),
            "road_access": random.choice([True, True, True, False]),  # 75% have road access
            "created_at": datetime.utcnow().isoformat(),
            "status": random.choice(["Available", "Available", "Available", "Sold", "Reserved"])
        }
        lands_list.append(land)
    
    await db.lands.insert_many(lands_list)
    print(f"Added {len(lands_list)} land records")
    
    # Generate statistics
    total_users = await db.users.count_documents({})
    total_lands = await db.lands.count_documents({})
    available_lands = await db.lands.count_documents({"status": "Available"})
    
    print("\n" + "="*60)
    print("SYNTHETIC DATA GENERATION COMPLETE!")
    print("="*60)
    print(f"Total Users: {total_users}")
    print(f"Total Land Records: {total_lands}")
    print(f"Available Lands: {available_lands}")
    print(f"Locations: Covering {len(set([l['location'] for l in lands_list]))} areas in Bengaluru")
    print("\nSample Land IDs:")
    for land in lands_list[:5]:
        print(f"   - {land['land_id']}: {land['area']} sqft in {land['location']}")
    print("\nTest Login Credentials:")
    print(f"   Username: {users_list[0]['username']}")
    print(f"   Password: secret123")
    print("\nAccess the API at: http://localhost:8000/docs")
    print("="*60)

if __name__ == "__main__":
    asyncio.run(generate_synthetic_data())
