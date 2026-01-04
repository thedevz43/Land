from pydantic import BaseModel
from typing import Optional

class Land(BaseModel):
    land_id: str
    owner: str
    location: str
    area: float
    details: Optional[str] = None
