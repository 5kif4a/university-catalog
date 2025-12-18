from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from app.ai.agent import ai_agent

router = APIRouter(prefix="/ai", tags=["AI Agent"])


class RecommendationRequest(BaseModel):
    session_id: str = Field(..., description="Unique session identifier for context tracking")
    query: str = Field(..., description="User's question or requirements")
    user_score: Optional[float] = Field(None, ge=0, le=1600, description="User's test score (SAT/equivalent)")
    preferred_country: Optional[str] = Field(None, description="Preferred country")
    preferred_specialty: Optional[str] = Field(None, description="Preferred field of study")

    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "user_123_session",
                "query": "I want to study Computer Science with a focus on AI",
                "user_score": 1450,
                "preferred_country": "USA",
                "preferred_specialty": "Computer Science"
            }
        }


class ComparisonRequest(BaseModel):
    session_id: str = Field(..., description="Session identifier")
    university_names: List[str] = Field(..., description="List of universities to compare")
    comparison_criteria: Optional[List[str]] = Field(
        None,
        description="Specific criteria to compare (e.g., ranking, tuition, acceptance_rate)"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "user_123_session",
                "university_names": ["MIT", "Stanford University", "Carnegie Mellon University"],
                "comparison_criteria": ["ranking", "tuition fees", "acceptance rate", "CS program"]
            }
        }


@router.post("/recommend")
async def recommend_universities(request: RecommendationRequest):
    """
    AI-powered university recommendation endpoint.

    This endpoint uses:
    - OpenAI GPT-4 for intelligent analysis and recommendations
    - In-memory session storage to track conversation history
    - MongoDB for university data retrieval

    The AI agent will:
    1. Retrieve past interactions from session storage
    2. Fetch relevant universities from the database
    3. Use GPT-4 to analyze and recommend universities
    4. Store the interaction in session for future reference
    """
    result = await ai_agent.recommend_universities(
        session_id=request.session_id,
        user_query=request.query,
        user_score=request.user_score,
        preferred_country=request.preferred_country,
        preferred_specialty=request.preferred_specialty
    )

    if not result.get("success"):
        raise HTTPException(
            status_code=500,
            detail=f"AI recommendation failed: {result.get('error', 'Unknown error')}"
        )

    return result


@router.post("/compare")
async def compare_universities(request: ComparisonRequest):
    """
    Compare multiple universities with AI analysis.

    Uses OpenAI GPT-4 to provide detailed comparison based on:
    - Rankings
    - Tuition fees
    - Acceptance rates
    - Program strength
    - Requirements

    Stores comparison in session for conversation tracking.
    """
    result = await ai_agent.compare_universities(
        session_id=request.session_id,
        university_names=request.university_names,
        comparison_criteria=request.comparison_criteria
    )

    if not result.get("success"):
        raise HTTPException(
            status_code=500,
            detail=f"AI comparison failed: {result.get('error', 'Unknown error')}"
        )

    return result


@router.get("/health")
async def ai_health_check():
    """
    Check AI agent health and OpenAI connectivity.
    """
    openai_configured = bool(ai_agent.client.api_key)

    return {
        "status": "operational" if openai_configured else "degraded",
        "openai_configured": openai_configured,
        "model": ai_agent.model,
        "session_storage": "in-memory",
        "capabilities": [
            "university_recommendations",
            "university_comparison",
            "conversation_tracking",
            "personalized_advice"
        ]
    }
