"""
Seed script to populate MongoDB with specialties and universities data
"""
import asyncio
import json
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.university import University, UniversityRequirements
from app.models.specialty import Specialty
from app.core.config import settings


async def clear_collections():
    """Clear existing data from collections"""
    print("Clearing existing data...")
    await Specialty.delete_all()
    await University.delete_all()
    print("Collections cleared.")


async def load_specialties():
    """Load specialties from JSON file"""
    print("\nLoading specialties...")

    # Path to specialties JSON file
    # Try different paths depending on whether running in container or locally
    possible_paths = [
        Path(__file__).parent / "specialties.json",  # Same directory as seed script
        Path("specialties.json"),  # Current directory
        Path(__file__).parent.parent / "frontend" / "src" / "mock" / "specialties.json",
        Path("/app/../frontend/src/mock/specialties.json"),
        Path("../frontend/src/mock/specialties.json"),
    ]

    specialties_path = None
    for path in possible_paths:
        if path.exists():
            specialties_path = path
            break

    if not specialties_path:
        raise FileNotFoundError("Could not find specialties.json file")

    with open(specialties_path, 'r', encoding='utf-8') as f:
        specialties_data = json.load(f)

    specialty_map = {}  # Map specialty name to ID

    for spec_data in specialties_data:
        specialty = Specialty(
            name=spec_data['name'],
            description=spec_data.get('description'),
            category=spec_data.get('category')
        )
        await specialty.insert()
        specialty_map[spec_data['name']] = str(specialty.id)
        print(f"  ✓ Added specialty: {spec_data['name']}")

    print(f"Total specialties loaded: {len(specialties_data)}")
    return specialty_map


async def load_universities(specialty_map):
    """Load universities from JSON file"""
    print("\nLoading universities...")

    # Path to universities JSON file
    # Try different paths depending on whether running in container or locally
    possible_paths = [
        Path(__file__).parent / "universities.json",  # Same directory as seed script
        Path("universities.json"),  # Current directory
        Path(__file__).parent.parent / "frontend" / "src" / "mock" / "universities.json",
        Path("/app/../frontend/src/mock/universities.json"),
        Path("../frontend/src/mock/universities.json"),
    ]

    universities_path = None
    for path in possible_paths:
        if path.exists():
            universities_path = path
            break

    if not universities_path:
        raise FileNotFoundError("Could not find universities.json file")

    with open(universities_path, 'r', encoding='utf-8') as f:
        universities_data = json.load(f)

    for uni_data in universities_data:
        # Map specialty names to IDs
        specialty_ids = []
        for spec_name in uni_data.get('specialty_names', []):
            if spec_name in specialty_map:
                specialty_ids.append(specialty_map[spec_name])

        # Convert requirements to UniversityRequirements objects
        requirements = []
        for req in uni_data.get('requirements', []):
            # Map specialty name to ID for requirements
            spec_name = req.get('specialty_name', '')
            spec_id = specialty_map.get(spec_name, req.get('specialty_id', ''))

            requirement = UniversityRequirements(
                specialty_id=spec_id,
                specialty_name=spec_name,
                minimum_score=req.get('minimum_score', 0),
                exams=req.get('exams', []),
                additional_requirements=req.get('additional_requirements')
            )
            requirements.append(requirement)

        university = University(
            name=uni_data['name'],
            country=uni_data['country'],
            city=uni_data['city'],
            description=uni_data.get('description'),
            website=uni_data.get('website'),
            ranking=uni_data.get('ranking'),
            specialties=specialty_ids,
            specialty_names=uni_data.get('specialty_names', []),
            requirements=requirements,
            tuition_fee_usd=uni_data.get('tuition_fee_usd'),
            student_count=uni_data.get('student_count'),
            acceptance_rate=uni_data.get('acceptance_rate')
        )
        await university.insert()
        print(f"  ✓ Added university: {uni_data['name']} ({uni_data['country']})")

    print(f"Total universities loaded: {len(universities_data)}")


async def seed_database():
    """Main function to seed the database"""
    print("=" * 60)
    print("Starting database seeding process...")
    print("=" * 60)

    # Connect to MongoDB
    print(f"\nConnecting to MongoDB: {settings.mongodb_url}")
    client = AsyncIOMotorClient(settings.mongodb_url)

    try:
        await init_beanie(
            database=client[settings.database_name],
            document_models=[University, Specialty]
        )
        print(f"Connected to database: {settings.database_name}")

        # Clear existing data
        await clear_collections()

        # Load specialties first (to get IDs for universities)
        specialty_map = await load_specialties()

        # Load universities with specialty references
        await load_universities(specialty_map)

        print("\n" + "=" * 60)
        print("Database seeding completed successfully!")
        print("=" * 60)

    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        raise
    finally:
        client.close()
        print("\nMongoDB connection closed.")


if __name__ == "__main__":
    asyncio.run(seed_database())
