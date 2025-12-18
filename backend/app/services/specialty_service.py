from typing import List, Optional
from beanie import PydanticObjectId
from app.models.specialty import Specialty


class SpecialtyService:
    @staticmethod
    async def create_specialty(specialty_data: dict) -> Specialty:
        specialty = Specialty(**specialty_data)
        await specialty.insert()
        return specialty

    @staticmethod
    async def get_specialty(specialty_id: PydanticObjectId) -> Optional[Specialty]:
        return await Specialty.get(specialty_id)

    @staticmethod
    async def get_all_specialties(skip: int = 0, limit: int = 100) -> List[Specialty]:
        return await Specialty.find_all().skip(skip).limit(limit).to_list()

    @staticmethod
    async def update_specialty(specialty_id: PydanticObjectId, specialty_data: dict) -> Optional[Specialty]:
        specialty = await Specialty.get(specialty_id)
        if not specialty:
            return None

        await specialty.set(specialty_data)
        return specialty

    @staticmethod
    async def delete_specialty(specialty_id: PydanticObjectId) -> bool:
        specialty = await Specialty.get(specialty_id)
        if not specialty:
            return False

        await specialty.delete()
        return True

    @staticmethod
    async def search_specialties(query: str) -> List[Specialty]:
        return await Specialty.find(
            {"$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}}
            ]}
        ).to_list()
