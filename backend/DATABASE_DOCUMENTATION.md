# Bharat Bhumi Portal - Database Documentation

## Table of Contents
1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [Collections Schema](#collections-schema)
4. [Data Models](#data-models)
5. [Indexes](#indexes)
6. [Sample Queries](#sample-queries)
7. [Data Relationships](#data-relationships)
8. [Best Practices](#best-practices)
9. [Backup and Maintenance](#backup-and-maintenance)

---

## Overview

### Database Information
- **Database Name**: `bharat_bhumi`
- **Type**: MongoDB (NoSQL)
- **Connection**: `mongodb://localhost:27017`
- **Driver**: Motor (Async MongoDB driver for Python)
- **Collections**: 2 primary collections (users, lands)

### Purpose
The database stores land records, user information, and related metadata for the Bharat Bhumi Portal, focusing on Bengaluru land management system.

---

## Database Architecture

### Connection Configuration
```python
# Location: backend/database/mongodb.py
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.bharat_bhumi
```

### Collections Overview
| Collection | Purpose | Estimated Size | Primary Key |
|-----------|---------|----------------|-------------|
| `users` | Store user account information | ~100-1000 docs | `_id` (ObjectId) |
| `lands` | Store land records and property details | ~200-10000 docs | `_id` (ObjectId) |

---

## Collections Schema

### 1. Users Collection

**Collection Name**: `users`

#### Schema Structure
```json
{
  "_id": ObjectId("..."),
  "username": String,
  "email": String,
  "hashed_password": String,
  "full_name": String,
  "phone": String,
  "created_at": String (ISO 8601)
}
```

#### Field Definitions

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| `_id` | ObjectId | Yes | Yes | MongoDB auto-generated unique identifier |
| `username` | String | Yes | Yes | User's unique login username |
| `email` | String (EmailStr) | Yes | Yes | User's email address (validated format) |
| `hashed_password` | String | Yes | No | Bcrypt hashed password (never store plain text) |
| `full_name` | String | No | No | User's full display name |
| `phone` | String | No | No | Contact phone number (format: +91XXXXXXXXXX) |
| `created_at` | String | No | No | Account creation timestamp (ISO 8601 format) |

#### Sample Document
```json
{
  "_id": ObjectId("679f1a2b3c4d5e6f7a8b9c0d"),
  "username": "rajesh.kumar23",
  "email": "rajesh.kumar23@gmail.com",
  "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
  "full_name": "Rajesh Kumar",
  "phone": "+918765432109",
  "created_at": "2026-01-11T10:30:45.123456"
}
```

#### Validation Rules
- **username**: Must be unique, 3-50 characters, alphanumeric with dots/underscores
- **email**: Must be valid email format, unique
- **password**: Minimum 8 characters (stored as bcrypt hash)
- **phone**: Optional, Indian format (+91 followed by 10 digits)

---

### 2. Lands Collection

**Collection Name**: `lands`

#### Schema Structure
```json
{
  "_id": ObjectId("..."),
  "land_id": String,
  "owner": String,
  "location": String,
  "full_address": String,
  "area": Number,
  "area_unit": String,
  "land_type": String,
  "survey_number": String,
  "price_per_sqft": Number,
  "total_price": Number,
  "currency": String,
  "details": String,
  "zone": String,
  "bbmp_approved": Boolean,
  "electricity": Boolean,
  "water_connection": Boolean,
  "road_access": Boolean,
  "created_at": String,
  "status": String
}
```

#### Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes | MongoDB auto-generated unique identifier |
| `land_id` | String | Yes | Custom land ID (Format: BLR-XXX-0001) |
| `owner` | String | Yes | Name of the land owner |
| `location` | String | Yes | Area/locality in Bengaluru |
| `full_address` | String | No | Complete address with survey number and PIN |
| `area` | Number (Float) | Yes | Land area size |
| `area_unit` | String | Yes | Unit of measurement (sqft, acres, hectares) |
| `land_type` | String | Yes | Type of land (see Land Types below) |
| `survey_number` | String | No | Government survey number (Format: XXX/X) |
| `price_per_sqft` | Number | No | Price per square foot in INR |
| `total_price` | Number | No | Total calculated price (area * price_per_sqft) |
| `currency` | String | No | Currency code (default: INR) |
| `details` | String | No | Detailed description of the property |
| `zone` | String | No | Zoning classification |
| `bbmp_approved` | Boolean | No | BBMP (Bruhat Bengaluru Mahanagara Palike) approval status |
| `electricity` | Boolean | No | Electricity connection availability |
| `water_connection` | Boolean | No | Water connection availability |
| `road_access` | Boolean | No | Road access availability |
| `created_at` | String | No | Record creation timestamp (ISO 8601) |
| `status` | String | No | Current status of the land |

#### Sample Document
```json
{
  "_id": ObjectId("679f1a2b3c4d5e6f7a8b9c0e"),
  "land_id": "BLR-KOR-0015",
  "owner": "Priya Sharma",
  "location": "Koramangala, Bengaluru",
  "full_address": "Survey No. 245/3, 456 Main Road, Koramangala, Bengaluru - 560034",
  "area": 2400,
  "area_unit": "sqft",
  "land_type": "Residential Plot",
  "survey_number": "245/3",
  "price_per_sqft": 8500,
  "total_price": 20400000,
  "currency": "INR",
  "details": "Residential Plot in prime Koramangala location. Well-connected with metro, schools, and shopping centers. Clear title with BBMP approval.",
  "zone": "Residential",
  "bbmp_approved": true,
  "electricity": true,
  "water_connection": true,
  "road_access": true,
  "created_at": "2026-01-11T10:30:45.123456",
  "status": "Available"
}
```

#### Land Types
- Residential Plot
- Commercial Plot
- Agricultural Land
- Villa Plot
- Apartment Site
- Industrial Plot
- Mixed Use Land
- Farm Land

#### Status Values
- `Available` - Property is available for sale
- `Sold` - Property has been sold
- `Reserved` - Property is reserved/under negotiation

#### Zone Types
- Residential
- Commercial
- Agricultural
- Industrial
- Mixed Use

---

## Data Models

### Pydantic Models

#### User Model
**Location**: `backend/models/user.py`

```python
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserInDB(User):
    hashed_password: str

class UserLogin(BaseModel):
    username: str
    password: str
```

#### Land Model
**Location**: `backend/models/land.py`

```python
from pydantic import BaseModel
from typing import Optional

class Land(BaseModel):
    land_id: str
    owner: str
    location: str
    area: float
    details: Optional[str] = None
```

---

## Indexes

### Recommended Indexes

#### Users Collection
```javascript
// Unique index on username
db.users.createIndex({ "username": 1 }, { unique: true })

// Unique index on email
db.users.createIndex({ "email": 1 }, { unique: true })

// Index on created_at for sorting
db.users.createIndex({ "created_at": -1 })
```

#### Lands Collection
```javascript
// Unique index on land_id
db.lands.createIndex({ "land_id": 1 }, { unique: true })

// Index on location for search queries
db.lands.createIndex({ "location": 1 })

// Compound index for location and status
db.lands.createIndex({ "location": 1, "status": 1 })

// Index on owner for filtering
db.lands.createIndex({ "owner": 1 })

// Index on status
db.lands.createIndex({ "status": 1 })

// Index on price range queries
db.lands.createIndex({ "total_price": 1 })

// Text index for full-text search
db.lands.createIndex({ 
  "location": "text", 
  "details": "text", 
  "full_address": "text" 
})
```

### Creating Indexes via MongoDB Shell
```bash
mongosh "mongodb://localhost:27017/bharat_bhumi"

// Create all indexes
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })
db.lands.createIndex({ "land_id": 1 }, { unique: true })
db.lands.createIndex({ "location": 1 })
db.lands.createIndex({ "location": 1, "status": 1 })
```

---

## Sample Queries

### User Queries

#### Find User by Username
```python
user = await db.users.find_one({"username": "rajesh.kumar23"})
```

#### Find User by Email
```python
user = await db.users.find_one({"email": "rajesh.kumar23@gmail.com"})
```

#### Get All Users (with pagination)
```python
users = await db.users.find().skip(0).limit(20).to_list(20)
```

#### Count Total Users
```python
total_users = await db.users.count_documents({})
```

### Land Queries

#### Search Lands by Location
```python
lands = await db.lands.find({"location": {"$regex": "Koramangala", "$options": "i"}}).to_list(100)
```

#### Get Available Lands
```python
available_lands = await db.lands.find({"status": "Available"}).to_list(100)
```

#### Find Lands by Price Range
```python
lands = await db.lands.find({
    "total_price": {"$gte": 5000000, "$lte": 20000000}
}).to_list(100)
```

#### Find Lands by Area Range
```python
lands = await db.lands.find({
    "area": {"$gte": 1000, "$lte": 5000}
}).to_list(100)
```

#### Search by Multiple Criteria
```python
lands = await db.lands.find({
    "location": {"$regex": "Koramangala", "$options": "i"},
    "status": "Available",
    "bbmp_approved": True,
    "total_price": {"$lte": 50000000}
}).to_list(100)
```

#### Get Lands with Amenities
```python
lands = await db.lands.find({
    "electricity": True,
    "water_connection": True,
    "road_access": True
}).to_list(100)
```

#### Full-Text Search
```python
lands = await db.lands.find({
    "$text": {"$search": "Koramangala metro"}
}).to_list(100)
```

#### Aggregation: Average Price by Location
```python
pipeline = [
    {"$group": {
        "_id": "$location",
        "avg_price": {"$avg": "$price_per_sqft"},
        "count": {"$sum": 1}
    }},
    {"$sort": {"avg_price": -1}}
]
results = await db.lands.aggregate(pipeline).to_list(None)
```

#### Aggregation: Total Land Area by Zone
```python
pipeline = [
    {"$group": {
        "_id": "$zone",
        "total_area": {"$sum": "$area"},
        "count": {"$sum": 1}
    }}
]
results = await db.lands.aggregate(pipeline).to_list(None)
```

---

## Data Relationships

### User-Land Relationship

While MongoDB is a NoSQL database and doesn't enforce foreign key constraints, there's a logical relationship:

```
users.full_name ←→ lands.owner (String reference)
```

**Note**: Currently implemented as a loose reference. For production, consider:
1. Storing `user_id` (ObjectId) in lands collection
2. Using MongoDB's `$lookup` for join operations

### Enhanced Schema with References
```json
// lands collection with user reference
{
  "_id": ObjectId("..."),
  "land_id": "BLR-KOR-0015",
  "owner_id": ObjectId("679f1a2b3c4d5e6f7a8b9c0d"),  // Reference to users._id
  "owner_name": "Priya Sharma",  // Denormalized for quick access
  // ... other fields
}
```

### Join Query Example
```python
pipeline = [
    {"$lookup": {
        "from": "users",
        "localField": "owner_id",
        "foreignField": "_id",
        "as": "owner_details"
    }},
    {"$unwind": "$owner_details"}
]
results = await db.lands.aggregate(pipeline).to_list(100)
```

---

## Best Practices

### 1. Connection Management
- Use connection pooling (Motor handles this automatically)
- Close connections gracefully on application shutdown
- Use environment variables for connection strings

```python
# Good practice
import os
MONGO_DETAILS = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
```

### 2. Error Handling
```python
from pymongo.errors import DuplicateKeyError

try:
    await db.users.insert_one(user_data)
except DuplicateKeyError:
    raise HTTPException(status_code=400, detail="User already exists")
```

### 3. Data Validation
- Use Pydantic models for automatic validation
- Validate data before insertion
- Use MongoDB schema validation (optional)

### 4. Performance Optimization
- Create appropriate indexes for frequently queried fields
- Use projection to return only required fields
- Implement pagination for large result sets
- Use aggregation pipeline for complex queries

```python
# Good: Return only needed fields
lands = await db.lands.find(
    {"status": "Available"},
    {"land_id": 1, "location": 1, "price_per_sqft": 1}
).to_list(100)
```

### 5. Security
- Never store plain text passwords
- Use bcrypt for password hashing (rounds: 12)
- Sanitize user inputs
- Implement rate limiting
- Use HTTPS in production

### 6. Data Consistency
- Use transactions for multi-document operations
- Implement soft deletes if needed
- Maintain audit trails

```python
# Example: Soft delete
await db.lands.update_one(
    {"land_id": "BLR-KOR-0015"},
    {"$set": {"deleted": True, "deleted_at": datetime.utcnow()}}
)
```

---

## Backup and Maintenance

### Backup Strategies

#### 1. Full Database Backup
```bash
# Backup entire database
mongodump --db bharat_bhumi --out /backup/$(date +%Y%m%d)

# Restore from backup
mongorestore --db bharat_bhumi /backup/20260111/bharat_bhumi
```

#### 2. Collection Backup
```bash
# Backup specific collection
mongodump --db bharat_bhumi --collection lands --out /backup/

# Restore collection
mongorestore --db bharat_bhumi --collection lands /backup/bharat_bhumi/lands.bson
```

#### 3. Export to JSON
```bash
# Export collection to JSON
mongoexport --db bharat_bhumi --collection lands --out lands.json --pretty

# Import from JSON
mongoimport --db bharat_bhumi --collection lands --file lands.json
```

### Automated Backup Script (Windows PowerShell)
```powershell
# backup_mongodb.ps1
$date = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "C:\mongodb_backups\$date"
mongodump --db bharat_bhumi --out $backupPath
Write-Host "Backup completed: $backupPath"
```

### Maintenance Tasks

#### 1. Database Statistics
```javascript
// MongoDB Shell
use bharat_bhumi
db.stats()
db.lands.stats()
db.users.stats()
```

#### 2. Index Monitoring
```javascript
// Check existing indexes
db.lands.getIndexes()

// Check index usage
db.lands.aggregate([{ $indexStats: {} }])
```

#### 3. Cleanup Old Data
```python
# Delete records older than 1 year
from datetime import datetime, timedelta

cutoff_date = datetime.utcnow() - timedelta(days=365)
result = await db.lands.delete_many({
    "status": "Sold",
    "created_at": {"$lt": cutoff_date.isoformat()}
})
```

#### 4. Optimize Collections
```javascript
// Compact collection to reclaim disk space
db.runCommand({ compact: 'lands' })
```

---

## Connection Examples

### Python (Motor - Async)
```python
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.bharat_bhumi

# Query example
async def get_lands():
    lands = await db.lands.find({"status": "Available"}).to_list(100)
    return lands
```

### Python (PyMongo - Sync)
```python
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client.bharat_bhumi

# Query example
lands = list(db.lands.find({"status": "Available"}).limit(100))
```

### MongoDB Compass
```
Connection String: mongodb://localhost:27017
Database: bharat_bhumi
```

---

## Troubleshooting

### Common Issues

#### 1. Connection Failed
```
Error: MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
Solution: Ensure MongoDB service is running
Windows: net start MongoDB
```

#### 2. Duplicate Key Error
```
Error: E11000 duplicate key error collection
Solution: Username or email already exists. Use unique values.
```

#### 3. Authentication Failed
```
Error: Authentication failed
Solution: Check username/password or connection string credentials
```

#### 4. Slow Queries
```
Solution: 
- Create appropriate indexes
- Use explain() to analyze query performance
- Implement pagination
```

---

## Database Schema Version

**Current Version**: 1.0  
**Last Updated**: January 11, 2026  
**Compatible With**: MongoDB 4.0+

---

## Future Enhancements

1. **Add Activity Logs Collection**
   - Track user actions
   - Audit trail for land modifications

2. **Add Transactions Collection**
   - Store land sale transactions
   - Payment records

3. **Add Documents Collection**
   - Store land documents (references to file storage)
   - Ownership certificates, maps, etc.

4. **Implement Geospatial Indexes**
   - Store coordinates for land locations
   - Enable proximity searches

5. **Add Notifications Collection**
   - User notifications
   - Price alerts

---

## Contact & Support

For database-related queries:
- Repository: https://github.com/thedevz43/Land
- Issues: https://github.com/thedevz43/Land/issues

---

**Document Version**: 1.0  
**Last Updated**: January 11, 2026  
**Author**: Development Team