from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.university import University
from app.models.specialty import Specialty


class Database:
    client: AsyncIOMotorClient = None


db = Database()


async def connect_to_mongo():
    db.client = AsyncIOMotorClient(settings.mongodb_url)
    await init_beanie(
        database=db.client[settings.database_name],
        document_models=[University, Specialty]
    )
    print(f"Connected to MongoDB: {settings.database_name}")


async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("MongoDB connection closed")
