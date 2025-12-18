# University AI Agent Documentation

## Purpose

The University AI Agent is an intelligent recommendation system built to help students find and compare universities based on their academic profile, preferences, and goals. It leverages advanced AI (Claude by Anthropic) and Context7 as a memory layer to provide personalized, context-aware recommendations.

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

### 3. Context-Aware Interactions
- Remembers past queries and preferences via Context7
- Provides continuity across sessions
- Adapts recommendations based on interaction history

### 4. Intelligent Advice
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
  "context_used": true,
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

## Context7 Usage

### What is Context7?

Context7 is used as a **memory and context management layer** for the AI agent. It stores:
- User interaction history
- Query patterns
- Preferences (countries, specialties, score ranges)
- Past recommendations

### Integration Points

#### 1. Storing Context
```python
await context7.store_context(
    session_id=session_id,
    context_data={
        "timestamp": "2025-12-18T10:30:00",
        "query": "Best CS universities in USA",
        "user_score": 1450,
        "preferred_country": "USA",
        "preferred_specialty": "Computer Science"
    },
    tags=["recommendation", "query"]
)
```

#### 2. Retrieving Context
```python
past_contexts = await context7.retrieve_context(
    session_id=session_id,
    limit=5
)
```

#### 3. Semantic Search
```python
relevant_contexts = await context7.search_context(
    session_id=session_id,
    query="previous AI university searches",
    limit=5
)
```

### Context7 API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `POST /v1/context` | Store new context data |
| `GET /v1/context/{session_id}` | Retrieve session history |
| `POST /v1/context/search` | Semantic search in context |
| `DELETE /v1/context/{session_id}` | Clear session data |

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
    ├─→ Context7Client (retrieve past context)
    ├─→ UniversityService (fetch relevant universities)
    ├─→ Claude API (generate recommendations)
    └─→ Context7Client (store interaction)
```

### Technology Stack

- **AI Model**: Claude 3.5 Sonnet (Anthropic)
- **Memory Layer**: Context7
- **Database**: MongoDB with Beanie ODM
- **Framework**: FastAPI (async)

### Key Components

1. **UniversityAIAgent** (`app/ai/agent.py`)
   - Main agent logic
   - Orchestrates Context7, Claude, and database queries

2. **Context7Client** (`app/ai/context7_client.py`)
   - Handles all Context7 API interactions
   - Manages session-based memory

3. **AI Router** (`app/routers/ai_router.py`)
   - Exposes HTTP endpoints
   - Request validation with Pydantic

### Configuration

Required environment variables:
```env
ANTHROPIC_API_KEY=sk-ant-...
CONTEXT7_API_KEY=ctx7_...
CONTEXT7_BASE_URL=https://api.context7.io
```

---

## Fallback Behaviour

### When Context7 is Unavailable

If Context7 API key is not configured or service is down:
- Agent continues to function
- Recommendations are provided without historical context
- `context_used: false` is returned in responses
- No errors thrown to user

```python
if not self.context7.enabled:
    # Continue without context
    past_contexts = []
```

### When Claude API Fails

If Anthropic API is unavailable:
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

### Example 2: Returning User

```bash
curl -X POST http://localhost:8000/api/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "returning_user_042",
    "query": "Now I am more interested in universities in Europe",
    "user_score": 1500
  }'
```

**Result**: AI retrieves past preferences from Context7 (previously showed interest in USA), adapts recommendations for Europe while considering past interactions.

### Example 3: Comparison

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
  "context7_enabled": true,
  "anthropic_configured": true,
  "model": "claude-3-5-sonnet-20241022",
  "capabilities": [
    "university_recommendations",
    "university_comparison",
    "context_tracking",
    "personalized_advice"
  ]
}
```

---

## Production Considerations

1. **API Key Security**: Store keys in secure environment variables or secret managers
2. **Rate Limiting**: Implement rate limiting on AI endpoints to control costs
3. **Caching**: Consider caching frequent queries to reduce API calls
4. **Monitoring**: Track Context7 and Claude API usage and errors
5. **Session Management**: Implement session expiry and cleanup for Context7

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
