# Bharat Bhumi Portal - Backend

Python FastAPI backend with MongoDB for the Bharat Bhumi land management portal.

## 📋 Requirements

- Python 3.10 or higher
- MongoDB 4.4 or higher
- pip (Python package manager)

## 🚀 Quick Start

### 1. Create Virtual Environment

```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

```powershell
pip install -r requirements.txt
pip install "pydantic[email]"
```

### 3. Start MongoDB

Ensure MongoDB is running:
```powershell
net start MongoDB
```

Or run manually:
```powershell
mongod --dbpath C:\data\db
```

### 4. Run the Server

```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── add_test_data.py       # Script to populate test data
├── routes/                # API route handlers
│   ├── auth.py           # Authentication endpoints
│   ├── land.py           # Land management endpoints
│   └── dashboard.py      # Dashboard endpoints
├── models/                # Pydantic data models
│   ├── user.py           # User models
│   ├── land.py           # Land models
│   └── dashboard.py      # Dashboard models
├── database/              # Database configuration
│   └── mongodb.py        # MongoDB connection
└── utils/                 # Helper functions
    └── auth.py           # Authentication utilities
```

## 🔌 API Endpoints

### Authentication (`/auth`)

**Register User**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

### Land Management (`/land`)

**Add Land**
```http
POST /land/add
Content-Type: application/json

{
  "land_id": "LAND001",
  "owner": "testuser",
  "location": "Delhi",
  "area": 500.0,
  "details": "Residential property"
}
```

**Search Lands**
```http
GET /land/search?location=Delhi
```

**Get Land Details**
```http
GET /land/{land_id}
```

**Update Land**
```http
PUT /land/{land_id}
Content-Type: application/json

{
  "land_id": "LAND001",
  "owner": "testuser",
  "location": "Delhi",
  "area": 600.0,
  "details": "Updated details"
}
```

**Delete Land**
```http
DELETE /land/{land_id}
```

### Dashboard (`/dashboard`)

**Get Dashboard Data**
```http
GET /dashboard/
```

## 🗄️ Database

**Database Name:** `bharat_bhumi`

**Collections:**
- `users` - User accounts with authentication
- `lands` - Land records

**Connection String:** `mongodb://localhost:27017`

### View Database

**MongoDB Compass (GUI):**
1. Download from https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `bharat_bhumi` database

**MongoDB Shell:**
```powershell
mongosh mongodb://localhost:27017/bharat_bhumi
```

### Add Test Data

Run the included script to populate sample data:
```powershell
python add_test_data.py
```

This creates:
- 1 test user (`testuser`)
- 2 sample land records (Delhi, Mumbai)

## 🔐 Security Configuration

### JWT Secret Key

**⚠️ Important:** Change the `SECRET_KEY` in `utils/auth.py` before deploying to production:

```python
SECRET_KEY = "your-secure-random-secret-key-here"
```

Generate a secure key:
```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### CORS Configuration

Update allowed origins in `main.py` for production:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],  # Change this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🧪 Testing

### Using Interactive API Docs

Visit http://localhost:8000/docs for Swagger UI with:
- Try out endpoints directly
- View request/response schemas
- Test authentication flow

### Using curl

```powershell
# Register user
curl -X POST http://localhost:8000/auth/register -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}'

# Login
curl -X POST http://localhost:8000/auth/login -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"password\":\"password123\"}'
```

## 🐛 Troubleshooting

### Module Not Found Error
```powershell
pip install -r requirements.txt
pip install "pydantic[email]"
```

### MongoDB Connection Error
- Ensure MongoDB service is running
- Check connection string in `database/mongodb.py`
- Verify MongoDB is listening on port 27017

### Import Errors
- Make sure you're in the `backend` directory
- Activate virtual environment
- Use relative imports (not `backend.` prefix)

## 📦 Dependencies

Main packages:
- `fastapi` - Web framework
- `motor` - Async MongoDB driver
- `pydantic` - Data validation
- `python-jose[cryptography]` - JWT tokens
- `passlib[bcrypt]` - Password hashing
- `uvicorn` - ASGI server

## 🚢 Production Deployment

### Environment Variables

Create a `.env` file:
```
MONGODB_URL=mongodb://localhost:27017
SECRET_KEY=your-secret-key
DATABASE_NAME=bharat_bhumi
```

### Run with Gunicorn

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker Deployment

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📝 Notes

- Password hashing uses bcrypt for security
- JWT tokens expire after 60 minutes (configurable)
- All endpoints support CORS for frontend integration
- Async operations for better performance
- MongoDB indexes can be added for optimization

## 🔗 Related Links

- FastAPI Documentation: https://fastapi.tiangolo.com/
- Motor Documentation: https://motor.readthedocs.io/
- MongoDB Documentation: https://docs.mongodb.com/
