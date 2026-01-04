# Bharat Bhumi Portal

A comprehensive land management system for government operations with modern frontend and robust backend infrastructure.

## 🚀 Project Overview

Bharat Bhumi Portal is a full-stack web application designed for efficient land record management, user authentication, and administrative dashboard operations. The system provides secure access to land records, search functionality, and comprehensive user management.

## 🛠️ Technologies Used

### Frontend
- **React** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn-ui** - Modern UI components
- **React Router** - Client-side routing

### Backend
- **Python 3.10+**
- **FastAPI** - High-performance async API framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.10+
- MongoDB 4.0+ (or MongoDB Atlas account)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/thedevz43/Land.git
cd Land
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will run on `http://localhost:8000`

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Windows (as Administrator)
net start MongoDB

# Or run manually
mongod --dbpath C:\data\db
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Update `backend/database/mongodb.py` with your connection string

### 5. Add Test Data (Optional)

```bash
cd backend
python add_test_data.py
```

This creates sample users and land records for testing.

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Available Endpoints

**Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login (returns JWT token)

**Land Management**
- `POST /land/add` - Add new land record
- `GET /land/search?location=...` - Search lands by location
- `GET /land/{land_id}` - Get specific land details
- `PUT /land/{land_id}` - Update land record
- `DELETE /land/{land_id}` - Delete land record

**Dashboard**
- `GET /dashboard/` - Get dashboard statistics

## 📁 Project Structure

```
bharat-bhumi-portal/
├── backend/
│   ├── database/
│   │   └── mongodb.py          # MongoDB connection
│   ├── models/
│   │   ├── user.py             # User data models
│   │   ├── land.py             # Land data models
│   │   └── dashboard.py        # Dashboard models
│   ├── routes/
│   │   ├── auth.py             # Authentication routes
│   │   ├── land.py             # Land CRUD routes
│   │   └── dashboard.py        # Dashboard routes
│   ├── utils/
│   │   └── auth.py             # Auth utilities (JWT, hashing)
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── add_test_data.py        # Test data script
├── src/
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── layouts/                # Layout components
│   ├── context/                # React context
│   └── utils/                  # Utility functions
├── public/                     # Static assets
└── package.json                # Node dependencies
```

## 🔒 Security Notes

- Update `SECRET_KEY` in `backend/utils/auth.py` for production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Configure CORS properly for your domain

## 🗄️ Database Collections

**users**
- username (string)
- email (string)
- hashed_password (string)

**lands**
- land_id (string)
- owner (string)
- location (string)
- area (number)
- details (string)

## 🚀 Deployment

### Frontend
```bash
npm run build
```
Deploy the `dist` folder to any static hosting service (Vercel, Netlify, etc.)

### Backend
- Deploy to services like Railway, Render, or AWS
- Ensure MongoDB connection string is configured via environment variables
- Set up proper environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created and maintained by [thedevz43](https://github.com/thedevz43)

## 🐛 Issues

Found a bug? Please open an issue on [GitHub Issues](https://github.com/thedevz43/Land/issues)
