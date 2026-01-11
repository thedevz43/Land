# Bharat Bhumi Portal Backend

## Setup Instructions

1. Install Python 3.10+ and MongoDB (ensure MongoDB is running on localhost:27017).
2. Open a terminal in the `backend` folder.
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```powershell
   uvicorn main:app --reload
   ```

## API Endpoints
- `/auth/register` - Register a new user
- `/auth/login` - Login and get JWT token
- `/land/add` - Add new land
- `/land/search?location=...` - Search lands by location
- `/land/{land_id}` - Get, update, or delete land by ID
- `/dashboard/` - Get dashboard summary

## Notes
- Update `SECRET_KEY` in `utils/auth.py` for production.
- Integrate frontend with these endpoints using HTTP requests.
