from typing import List, Optional, Dict, Any
from beanie import PydanticObjectId
from beanie.operators import In, GTE, LTE
from app.models.university import University


class UniversityService:
    @staticmethod
    async def create_university(university_data: dict) -> University:
        university = University(**university_data)
        await university.insert()
        return university

    @staticmethod
    async def get_university(university_id: PydanticObjectId) -> Optional[University]:
        return await University.get(university_id)

    @staticmethod
    async def get_all_universities(
        skip: int = 0,
        limit: int = 20,
        country: Optional[str] = None,
        specialty: Optional[str] = None,
        min_score: Optional[float] = None,
        sort_by: str = "name",
        sort_order: int = 1
    ) -> tuple[List[University], int]:
        query_filters = []

        if country:
            query_filters.append({"country": {"$regex": country, "$options": "i"}})

        if specialty:
            query_filters.append({"specialty_names": {"$regex": specialty, "$options": "i"}})

        if min_score is not None:
            query_filters.append({"requirements.minimum_score": {"$lte": min_score}})

        if query_filters:
            query = University.find({"$and": query_filters})
        else:
            query = University.find_all()

        total = await query.count()

        sort_mapping = {
            "name": "name",
            "ranking": "ranking",
            "tuition_fee": "tuition_fee_usd",
            "acceptance_rate": "acceptance_rate"
        }
        sort_field = sort_mapping.get(sort_by, "name")

        if sort_order == -1:
            sort_query = f"-{sort_field}"
        else:
            sort_query = sort_field

        universities = await query.sort(sort_query).skip(skip).limit(limit).to_list()

        return universities, total

    @staticmethod
    async def update_university(
        university_id: PydanticObjectId,
        university_data: dict
    ) -> Optional[University]:
        university = await University.get(university_id)
        if not university:
            return None

        await university.set(university_data)
        return university

    @staticmethod
    async def delete_university(university_id: PydanticObjectId) -> bool:
        university = await University.get(university_id)
        if not university:
            return False

        await university.delete()
        return True

    @staticmethod
    async def search_universities(query: str) -> List[University]:
        return await University.find(
            {"$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}},
                {"city": {"$regex": query, "$options": "i"}}
            ]}
        ).to_list()

    @staticmethod
    async def add_specialty_to_university(
        university_id: PydanticObjectId,
        specialty_id: str,
        specialty_name: str,
        requirements: dict
    ) -> Optional[University]:
        university = await University.get(university_id)
        if not university:
            return None

        if specialty_id not in university.specialties:
            university.specialties.append(specialty_id)
            university.specialty_names.append(specialty_name)

        requirement_exists = any(
            req.specialty_id == specialty_id for req in university.requirements
        )

        if not requirement_exists:
            from app.models.university import UniversityRequirements
            req = UniversityRequirements(
                specialty_id=specialty_id,
                specialty_name=specialty_name,
                **requirements
            )
            university.requirements.append(req)

        await university.save()
        return university

    @staticmethod
    async def remove_specialty_from_university(
        university_id: PydanticObjectId,
        specialty_id: str
    ) -> Optional[University]:
        university = await University.get(university_id)
        if not university:
            return None

        if specialty_id in university.specialties:
            idx = university.specialties.index(specialty_id)
            university.specialties.pop(idx)
            university.specialty_names.pop(idx)

        university.requirements = [
            req for req in university.requirements if req.specialty_id != specialty_id
        ]

        await university.save()
        return university
