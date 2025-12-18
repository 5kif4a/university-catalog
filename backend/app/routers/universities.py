from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Query
from beanie import PydanticObjectId
from pydantic import BaseModel, Field
from app.models.university import University
from app.services.university_service import UniversityService

router = APIRouter(prefix="/universities", tags=["Universities"])


class PaginatedResponse(BaseModel):
    items: List[University]
    total: int
    page: int
    page_size: int
    total_pages: int


class AddSpecialtyRequest(BaseModel):
    specialty_id: str
    specialty_name: str
    minimum_score: float = Field(..., ge=0, le=800)
    exams: List[str] = Field(default_factory=list)
    additional_requirements: Optional[str] = None


@router.post("/", response_model=University, status_code=status.HTTP_201_CREATED)
async def create_university(university: University):
    return await UniversityService.create_university(university.model_dump(exclude={"id"}))


@router.get("/", response_model=PaginatedResponse)
async def get_universities(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    country: Optional[str] = Query(None),
    specialty: Optional[str] = Query(None),
    min_score: Optional[float] = Query(None, ge=0, le=800),
    sort_by: str = Query("name", regex="^(name|ranking|tuition_fee|acceptance_rate)$"),
    sort_order: str = Query("asc", regex="^(asc|desc)$")
):
    skip = (page - 1) * page_size
    sort_order_int = 1 if sort_order == "asc" else -1

    universities, total = await UniversityService.get_all_universities(
        skip=skip,
        limit=page_size,
        country=country,
        specialty=specialty,
        min_score=min_score,
        sort_by=sort_by,
        sort_order=sort_order_int
    )

    total_pages = (total + page_size - 1) // page_size

    return PaginatedResponse(
        items=universities,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@router.get("/search", response_model=List[University])
async def search_universities(query: str = Query(..., min_length=1)):
    return await UniversityService.search_universities(query)


@router.get("/{university_id}", response_model=University)
async def get_university(university_id: PydanticObjectId):
    university = await UniversityService.get_university(university_id)
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    return university


@router.put("/{university_id}", response_model=University)
async def update_university(university_id: PydanticObjectId, university_data: dict):
    university = await UniversityService.update_university(university_id, university_data)
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    return university


@router.delete("/{university_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_university(university_id: PydanticObjectId):
    success = await UniversityService.delete_university(university_id)
    if not success:
        raise HTTPException(status_code=404, detail="University not found")


@router.post("/{university_id}/specialties", response_model=University)
async def add_specialty_to_university(
    university_id: PydanticObjectId,
    request: AddSpecialtyRequest
):
    requirements = {
        "minimum_score": request.minimum_score,
        "exams": request.exams,
        "additional_requirements": request.additional_requirements
    }

    university = await UniversityService.add_specialty_to_university(
        university_id,
        request.specialty_id,
        request.specialty_name,
        requirements
    )

    if not university:
        raise HTTPException(status_code=404, detail="University not found")

    return university


@router.delete("/{university_id}/specialties/{specialty_id}", response_model=University)
async def remove_specialty_from_university(
    university_id: PydanticObjectId,
    specialty_id: str
):
    university = await UniversityService.remove_specialty_from_university(
        university_id,
        specialty_id
    )

    if not university:
        raise HTTPException(status_code=404, detail="University not found")

    return university
