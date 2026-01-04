from fastapi import FastAPI
from backend.routes import auth, land, dashboard

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(land.router, prefix="/land", tags=["land"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

@app.get("/")
def root():
    return {"message": "Bharat Bhumi Portal Backend is running"}
