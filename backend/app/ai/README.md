# AI Agent Service

AI-powered university recommendation and comparison service using OpenAI GPT-4.

## Overview

The AI Agent provides intelligent university recommendations and comparisons based on user preferences, test scores, and other criteria. It uses OpenAI's GPT-4 for natural language understanding and generation.

## Features

- **University Recommendations**: Get personalized university suggestions based on:
  - Test scores (SAT/equivalent)
  - Preferred country
  - Preferred specialty/major
  - Natural language queries

- **University Comparisons**: Compare multiple universities side-by-side with:
  - Rankings analysis
  - Tuition fee comparisons
  - Acceptance rate analysis
  - Program strength evaluation
  - Requirements breakdown

- **Conversation Memory**: In-memory session storage maintains conversation context for follow-up questions

## Architecture

```
┌─────────────────┐
│   API Router    │  (/api/ai/recommend, /api/ai/compare)
└────────┬────────┘
         │
┌────────▼────────┐
│  AI Agent       │  (UniversityAIAgent class)
│  - OpenAI GPT-4 │
│  - Session Mgmt │
└────────┬────────┘
         │
┌────────▼────────┐
│ University      │  (MongoDB queries)
│ Service         │
└─────────────────┘
```

## Configuration

### Environment Variables

Required in `.env`:

```bash
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Get your key from: https://platform.openai.com/api-keys
```

### Model Configuration

The agent uses `gpt-4o-mini` by default. You can change this in `agent.py`:

```python
self.model = "gpt-4o-mini"  # or "gpt-4", "gpt-4-turbo", etc.
```

## API Endpoints

### POST /api/ai/recommend

Get personalized university recommendations.

**Request Body:**
```json
{
  "session_id": "user_123_session",
  "query": "I want to study Computer Science with a focus on AI",
  "user_score": 1450,
  "preferred_country": "USA",
  "preferred_specialty": "Computer Science"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": "Based on your criteria...",
  "universities_analyzed": 10,
  "total_universities_available": 50,
  "session_id": "user_123_session"
}
```

### POST /api/ai/compare

Compare multiple universities.

**Request Body:**
```json
{
  "session_id": "user_123_session",
  "university_names": ["MIT", "Stanford University", "CMU"],
  "comparison_criteria": ["ranking", "tuition fees", "CS program"]
}
```

**Response:**
```json
{
  "success": true,
  "comparison": "Comparison analysis...",
  "universities_compared": 3
}
```

### GET /api/ai/health

Check AI service health.

**Response:**
```json
{
  "status": "operational",
  "openai_configured": true,
  "model": "gpt-4o-mini",
  "session_storage": "in-memory",
  "capabilities": [
    "university_recommendations",
    "university_comparison",
    "conversation_tracking",
    "personalized_advice"
  ]
}
```

## Usage Examples

### Python

```python
import requests

# Recommend universities
response = requests.post(
    "http://localhost:8000/api/ai/recommend",
    json={
        "session_id": "user_123",
        "query": "Best universities for CS with good financial aid",
        "user_score": 1400,
        "preferred_country": "USA"
    }
)
result = response.json()
print(result["recommendations"])

# Compare universities
response = requests.post(
    "http://localhost:8000/api/ai/compare",
    json={
        "session_id": "user_123",
        "university_names": ["MIT", "Stanford"],
        "comparison_criteria": ["tuition fees", "acceptance rate"]
    }
)
result = response.json()
print(result["comparison"])
```

### JavaScript/TypeScript

```typescript
// Recommend universities
const response = await fetch('/api/ai/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    session_id: 'user_123',
    query: 'Universities with strong AI programs',
    user_score: 1500,
    preferred_specialty: 'Computer Science'
  })
});
const data = await response.json();
console.log(data.recommendations);
```

### cURL

```bash
# Recommend
curl -X POST http://localhost:8000/api/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user_123",
    "query": "Best CS programs in Europe",
    "user_score": 1450,
    "preferred_country": "UK"
  }'

# Compare
curl -X POST http://localhost:8000/api/ai/compare \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user_123",
    "university_names": ["Oxford", "Cambridge"],
    "comparison_criteria": ["ranking", "requirements"]
  }'
```

## Session Management

The agent maintains conversation history using in-memory session storage:

- Sessions are identified by `session_id` (string)
- Each session stores up to 20 messages (10 exchanges)
- Older messages are automatically pruned
- Sessions persist for the lifetime of the backend process

**Important**: Sessions are stored in memory and will be lost when the backend restarts. For production, consider implementing persistent storage (Redis, database, etc.).

## Customization

### System Prompt

The agent's behavior is controlled by the system prompt in `_build_system_prompt()`. Modify it to change the agent's personality or focus:

```python
base_prompt = """You are an expert university advisor...
- Customize instructions here
- Add specific guidelines
- Define response format
"""
```

### Temperature & Token Limits

Adjust response creativity and length in agent.py:

```python
response = await self.client.chat.completions.create(
    model=self.model,
    messages=messages,
    max_tokens=2000,  # Increase for longer responses
    temperature=0.7   # 0.0 = deterministic, 1.0 = creative
)
```

## Error Handling

The agent returns structured error responses:

```json
{
  "success": false,
  "error": "Error message details",
  "universities_analyzed": 0
}
```

Common errors:
- Invalid OpenAI API key
- Rate limiting
- No universities found matching criteria
- Network connectivity issues

## Performance Considerations

- **Response Time**: GPT-4 calls typically take 2-10 seconds
- **Rate Limits**: OpenAI has API rate limits based on your plan
- **Token Usage**: Each recommendation uses ~500-1500 tokens
- **Memory**: Session storage grows with active users

## Testing

Test the AI endpoints using the Swagger UI:

1. Start the backend: `docker-compose up -d`
2. Open: http://localhost:8000/docs
3. Navigate to AI Agent section
4. Try the `/ai/recommend` or `/ai/compare` endpoints

## Troubleshooting

### "OpenAI API key not configured"

Ensure `OPENAI_API_KEY` is set in `.env`:

```bash
# Check configuration
curl http://localhost:8000/api/ai/health
```

### Rate Limiting Errors

OpenAI has rate limits. Consider:
- Upgrading your OpenAI plan
- Implementing request queuing
- Adding retry logic with backoff

### Poor Response Quality

Try adjusting:
- System prompt for better instructions
- Temperature (lower = more focused)
- Providing more context in queries

## Migration from Anthropic

If migrating from the previous Anthropic-based implementation:

1. Update `.env`: Replace `ANTHROPIC_API_KEY` with `OPENAI_API_KEY`
2. Remove Context7 references if present
3. Update client code to use new response format
4. Test all API endpoints

## Dependencies

```
openai>=1.0.0  # OpenAI Python SDK
```

Install:
```bash
pip install openai
```

## Security

- **Never commit API keys** to version control
- Use environment variables for all secrets
- Implement rate limiting to prevent abuse
- Monitor API usage and costs
- Consider request validation and sanitization

## Cost Estimation

Approximate costs with GPT-4o-mini:
- Recommendation: ~$0.001 per request
- Comparison: ~$0.0008 per request

Monitor usage: https://platform.openai.com/usage

## Future Improvements

- [ ] Persistent session storage (Redis/PostgreSQL)
- [ ] Streaming responses for real-time feedback
- [ ] Multi-language support
- [ ] Fine-tuned models for better domain expertise
- [ ] User feedback integration for response quality
- [ ] Caching frequently requested comparisons
- [ ] A/B testing different prompts

## Support

For issues or questions:
- Check logs: `docker-compose logs backend`
- Review OpenAI status: https://status.openai.com/
- Test health endpoint: `/api/ai/health`
