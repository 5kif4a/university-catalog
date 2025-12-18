from typing import List
from fastapi import APIRouter, HTTPException, status, Query
from beanie import PydanticObjectId
from app.models.specialty import Specialty
from app.services.specialty_service import SpecialtyService

router = APIRouter(prefix="/specialties", tags=["Specialties"])


@router.post("/", response_model=Specialty, status_code=status.HTTP_201_CREATED)
async def create_specialty(specialty: Specialty):
    return await SpecialtyService.create_specialty(specialty.model_dump(exclude={"id"}))


@router.get("/", response_model=List[Specialty])
async def get_specialties(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100)
):
    return await SpecialtyService.get_all_specialties(skip=skip, limit=limit)


@router.get("/search", response_model=List[Specialty])
async def search_specialties(query: str = Query(..., min_length=1)):
    return await SpecialtyService.search_specialties(query)


@router.get("/{specialty_id}", response_model=Specialty)
async def get_specialty(specialty_id: PydanticObjectId):
    specialty = await SpecialtyService.get_specialty(specialty_id)
    if not specialty:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return specialty


@router.put("/{specialty_id}", response_model=Specialty)
async def update_specialty(specialty_id: PydanticObjectId, specialty_data: dict):
    specialty = await SpecialtyService.update_specialty(specialty_id, specialty_data)
    if not specialty:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return specialty


@router.delete("/{specialty_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_specialty(specialty_id: PydanticObjectId):
    success = await SpecialtyService.delete_specialty(specialty_id)
    if not success:
        raise HTTPException(status_code=404, detail="Specialty not found")
