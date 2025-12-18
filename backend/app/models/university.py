from typing import List, Optional
from beanie import Document, Link
from pydantic import Field, HttpUrl
from app.models.specialty import Specialty


class UniversityRequirements(Document):
    specialty_id: str = Field(..., description="Reference to specialty")
    specialty_name: str = Field(..., description="Specialty name for denormalization")
    minimum_score: float = Field(..., ge=0, le=800, description="Minimum SAT/equivalent score")
    exams: List[str] = Field(default_factory=list, description="Required exams")
    additional_requirements: Optional[str] = Field(None, description="Additional requirements")


class University(Document):
    name: str = Field(..., description="University name")
    country: str = Field(..., description="Country")
    city: str = Field(..., description="City")
    description: Optional[str] = Field(None, description="University description")
    website: Optional[HttpUrl] = Field(None, description="Official website")
    ranking: Optional[int] = Field(None, ge=1, description="World ranking")
    specialties: List[str] = Field(default_factory=list, description="List of specialty IDs")
    specialty_names: List[str] = Field(default_factory=list, description="Denormalized specialty names")
    requirements: List[UniversityRequirements] = Field(
        default_factory=list,
        description="Requirements per specialty"
    )
    tuition_fee_usd: Optional[float] = Field(None, ge=0, description="Annual tuition in USD")
    student_count: Optional[int] = Field(None, ge=0, description="Total student count")
    acceptance_rate: Optional[float] = Field(None, ge=0, le=100, description="Acceptance rate percentage")

    class Settings:
        name = "universities"
        indexes = [
            "name",
            "country",
            "specialties",
            "ranking"
        ]

    class Config:
        json_schema_extra = {
            "example": {
                "name": "MIT",
                "country": "USA",
                "city": "Cambridge",
                "description": "Massachusetts Institute of Technology",
                "website": "https://www.mit.edu",
                "ranking": 1,
                "specialties": ["specialty_id_1"],
                "specialty_names": ["Computer Science"],
                "requirements": [
                    {
                        "specialty_id": "specialty_id_1",
                        "specialty_name": "Computer Science",
                        "minimum_score": 1500,
                        "exams": ["SAT", "SAT Subject Tests"],
                        "additional_requirements": "Strong math background"
                    }
                ],
                "tuition_fee_usd": 53790,
                "student_count": 11520,
                "acceptance_rate": 3.2
            }
        }
