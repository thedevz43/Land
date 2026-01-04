from pydantic import BaseModel

class DashboardData(BaseModel):
    total_lands: int
    total_users: int
    recent_activity: list
