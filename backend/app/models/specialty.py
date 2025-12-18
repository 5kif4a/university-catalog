from typing import Optional
from beanie import Document
from pydantic import Field


class Specialty(Document):
    name: str = Field(..., description="Specialty name")
    description: Optional[str] = Field(None, description="Specialty description")
    category: Optional[str] = Field(None, description="Specialty category (e.g., Engineering, Medicine)")

    class Settings:
        name = "specialties"
        indexes = ["name"]

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Computer Science",
                "description": "Study of computation and information processing",
                "category": "Engineering"
            }
        }
