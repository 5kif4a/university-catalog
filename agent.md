# University AI Agent Documentation

## Purpose

The University AI Agent is an intelligent recommendation system built to help students find and compare universities based on their academic profile, preferences, and goals. It leverages OpenAI's GPT models to provide personalized, context-aware recommendations.

---

## Capabilities

### 1. University Recommendations
- Analyzes user academic scores and preferences
- Filters universities by country, specialty, and admission requirements
- Provides top 3-5 personalized recommendations with detailed reasoning
- Explains pros and cons for each university
- Considers ranking, tuition, acceptance rates, and program strength

### 2. University Comparison
- Compares multiple universities side-by-side
- Analyzes specific criteria (ranking, tuition, acceptance rate, etc.)
- Provides objective assessment of differences
- Recommends best fit based on user goals

### 3. Intelligent Advice
- Offers application process guidance
- Explains admission chances realistically
- Considers cultural fit and financial aspects

---

## Inputs / Outputs

### POST `/api/ai/recommend`

**Input:**
```json
{
  "session_id": "user_123_session",
  "query": "I want to study Computer Science with focus on AI",
  "user_score": 1450,
  "preferred_country": "USA",
  "preferred_specialty": "Computer Science"
}
```

**Output:**
```json
{
  "success": true,
  "recommendations": "Based on your profile... [detailed AI response]",
  "universities_analyzed": 10,
  "total_universities_available": 50,
  "session_id": "user_123_session"
}
```

### POST `/api/ai/compare`

**Input:**
```json
{
  "session_id": "user_123_session",
  "university_names": ["MIT", "Stanford", "Carnegie Mellon"],
  "comparison_criteria": ["ranking", "tuition", "acceptance_rate"]
}
```

**Output:**
```json
{
  "success": true,
  "comparison": "[AI-generated side-by-side comparison]",
  "universities_compared": 3
}
```

---

## Integration Details

### Architecture

```
User Request
    ↓
FastAPI Router (/api/ai/recommend)
    ↓
UniversityAIAgent
    ↓
    ├─→ UniversityService (fetch relevant universities)
    └─→ OpenAI API (generate recommendations)
```

### Technology Stack

- **AI Model**: OpenAI GPT models (GPT-4, GPT-3.5-turbo)
- **Database**: MongoDB with Beanie ODM
- **Framework**: FastAPI (async)

### Key Components

1. **UniversityAIAgent** (`app/ai/agent.py`)
   - Main agent logic
   - Orchestrates OpenAI API and database queries

2. **AI Router** (`app/routers/ai_router.py`)
   - Exposes HTTP endpoints
   - Request validation with Pydantic

### Configuration

Required environment variables:
```env
OPENAI_API_KEY=sk-...
```

---

## Fallback Behaviour

### When OpenAI API Fails

If OpenAI API is unavailable:
- Returns error response with `success: false`
- Includes error message for debugging
- HTTP 500 status code returned

```json
{
  "success": false,
  "error": "API connection timeout",
  "universities_analyzed": 10
}
```

### When No Universities Match Criteria

If database query returns no results:
- Agent still responds with general advice
- Suggests broadening search criteria
- Explains why no matches were found

---

## Usage Examples

### Example 1: First-time User

```bash
curl -X POST http://localhost:8000/api/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "new_user_001",
    "query": "I scored 1500 on SAT and want to study Engineering",
    "user_score": 1500,
    "preferred_specialty": "Engineering"
  }'
```

**Result**: AI analyzes available universities, provides recommendations without historical context.

### Example 2: Comparison

```bash
curl -X POST http://localhost:8000/api/ai/compare \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user_123",
    "university_names": ["Harvard", "Yale", "Princeton"],
    "comparison_criteria": ["ranking", "tuition", "acceptance_rate"]
  }'
```

**Result**: Detailed side-by-side comparison with AI analysis.

---

## Health Check

Monitor agent status:

```bash
curl http://localhost:8000/api/ai/health
```

**Response:**
```json
{
  "status": "operational",
  "openai_configured": true,
  "model": "gpt-4",
  "capabilities": [
    "university_recommendations",
    "university_comparison",
    "personalized_advice"
  ]
}
```

---

## Production Considerations

1. **API Key Security**: Store keys in secure environment variables or secret managers
2. **Rate Limiting**: Implement rate limiting on AI endpoints to control costs
3. **Caching**: Consider caching frequent queries to reduce API calls
4. **Monitoring**: Track OpenAI API usage and errors
5. **Cost Management**: Monitor token usage and implement usage limits

---

## Future Enhancements

- Multimodal input (upload transcripts, documents)
- Email notifications for new matching universities
- Personalized application timeline generation
- Integration with university application portals
- Sentiment analysis of student reviews

---

**Last Updated**: 2025-12-18
**Version**: 1.0.0
**Maintained By**: Backend Team
