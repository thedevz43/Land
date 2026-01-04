from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, land, dashboard

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(land.router, prefix="/land", tags=["land"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

@app.get("/")
def root():
    return {"message": "Bharat Bhumi Portal Backend is running"}
