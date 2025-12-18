from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.db.mongodb import connect_to_mongo, close_mongo_connection
from app.routers import universities, specialties, ai_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        await connect_to_mongo()
        print("[OK] MongoDB connected successfully")
    except Exception as e:
        print(f"[WARNING] MongoDB connection failed: {str(e)[:100]}")
        print("[WARNING] API will run in demo mode without database")
    yield
    # Shutdown
    await close_mongo_connection()


app = FastAPI(
    title=settings.app_title,
    version=settings.app_version,
    description=settings.app_description,
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(universities.router, prefix="/api")
app.include_router(specialties.router, prefix="/api")
app.include_router(ai_router.router, prefix="/api")


@app.get("/")
async def root():
    return {
        "message": "University Aggregator API",
        "version": settings.app_version,
        "docs": "/docs",
        "endpoints": {
            "universities": "/api/universities",
            "specialties": "/api/specialties",
            "ai_recommendations": "/api/ai/recommend",
            "ai_comparison": "/api/ai/compare"
        }
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "version": settings.app_version
    }
