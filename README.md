# University Aggregator

A full-stack platform for exploring universities worldwide with AI-powered recommendations.

---

## Project Overview

University Aggregator is an educational catalog that helps students discover universities, understand admission requirements, and receive personalized AI recommendations based on their academic profile.

---

## Features

### Core Functionality
- Browse universities with detailed information
- Filter by country, specialty, and minimum score
- View admission requirements per specialty
- Pagination and sorting support
- Many-to-Many relationship (Universities ↔ Specialties)

### AI Agent (Production-Ready)
- Personalized university recommendations
- Intelligent comparison between universities
- Context-aware conversations with Context7 memory
- Realistic admission chance assessment
- Application guidance and advice

---

## Tech Stack

### Backend
- **Python 3.11+**
- **FastAPI** - Modern async web framework
- **MongoDB** - NoSQL database
- **Beanie ODM** - Async MongoDB object-document mapper
- **Claude (Anthropic)** - AI for recommendations
- **Context7** - Memory and context layer for AI agent

### Frontend
- TBD (React/Next.js planned)

---

## Backend Architecture

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── core/
│   │   ├── config.py        # Settings and environment variables
│   ├── db/
│   │   ├── mongodb.py       # Database connection and initialization
│   ├── models/
│   │   ├── university.py    # University and Requirements models
│   │   ├── specialty.py     # Specialty model
│   ├── services/
│   │   ├── university_service.py  # Business logic for universities
│   │   ├── specialty_service.py   # Business logic for specialties
│   ├── routers/
│   │   ├── universities.py  # University endpoints
│   │   ├── specialties.py   # Specialty endpoints
│   │   ├── ai_router.py     # AI agent endpoints
│   └── ai/
│       ├── agent.py         # AI recommendation logic
│       ├── context7_client.py # Context7 integration
├── requirements.txt
├── .env.example
└── .gitignore
```

---

## Getting Started

You can run the backend either with Docker (recommended) or directly with Python.

### Option 1: Docker Setup (Recommended)

The easiest way to run the backend for local development.

#### Prerequisites
- Docker Desktop (or Docker Engine + Docker Compose)
- Anthropic API key (for AI features)
- Context7 API key (optional, for memory features)

#### Quick Start
```bash
# 1. Navigate to backend directory
cd backend

# 2. Configure environment
cp .env.example .env
# Edit .env and add your API keys

# 3. Start services
docker-compose up -d

# 4. Access services
# - API: http://localhost:8000/docs
# - Mongo Express: http://localhost:8081 (admin/admin123)
```

See [backend/DOCKER.md](backend/DOCKER.md) for detailed Docker documentation.

---

### Option 2: Local Python Setup

#### Prerequisites
- Python 3.11 or higher
- MongoDB running locally or remote connection
- Anthropic API key (for AI features)
- Context7 API key (optional, for memory features)

#### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=university_catalog
ANTHROPIC_API_KEY=your_anthropic_key
CONTEXT7_API_KEY=your_context7_key
CONTEXT7_BASE_URL=https://api.context7.io
```

5. Start the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

6. Access API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## API Endpoints

### Universities
- `GET /api/universities` - List universities (with filters, pagination, sorting)
- `GET /api/universities/{id}` - Get university details
- `POST /api/universities` - Create university
- `PUT /api/universities/{id}` - Update university
- `DELETE /api/universities/{id}` - Delete university
- `POST /api/universities/{id}/specialties` - Add specialty to university
- `DELETE /api/universities/{id}/specialties/{specialty_id}` - Remove specialty

### Specialties
- `GET /api/specialties` - List specialties
- `GET /api/specialties/{id}` - Get specialty details
- `POST /api/specialties` - Create specialty
- `PUT /api/specialties/{id}` - Update specialty
- `DELETE /api/specialties/{id}` - Delete specialty

### AI Agent
- `POST /api/ai/recommend` - Get personalized university recommendations
- `POST /api/ai/compare` - Compare multiple universities
- `GET /api/ai/health` - Check AI agent status

---

## AI Agent Details

The AI agent uses:
1. **Claude 3.5 Sonnet** for intelligent analysis and natural language responses
2. **Context7** as a memory layer to track user sessions and preferences
3. **MongoDB** for fetching relevant university data

See [agent.md](agent.md) for comprehensive documentation.

### Example AI Request

```bash
curl -X POST http://localhost:8000/api/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user_123",
    "query": "I want to study Computer Science in the USA",
    "user_score": 1450,
    "preferred_country": "USA",
    "preferred_specialty": "Computer Science"
  }'
```

---

## Database Schema

### University
```python
{
  "name": str,
  "country": str,
  "city": str,
  "description": str (optional),
  "website": HttpUrl (optional),
  "ranking": int (optional),
  "specialties": [str],  # Specialty IDs
  "specialty_names": [str],  # Denormalized
  "requirements": [
    {
      "specialty_id": str,
      "specialty_name": str,
      "minimum_score": float,
      "exams": [str],
      "additional_requirements": str (optional)
    }
  ],
  "tuition_fee_usd": float (optional),
  "student_count": int (optional),
  "acceptance_rate": float (optional)
}
```

### Specialty
```python
{
  "name": str,
  "description": str (optional),
  "category": str (optional)
}
```

---

## Development

### Running Tests
```bash
pytest tests/
```

### Code Quality
```bash
# Format code
black app/

# Lint
flake8 app/

# Type checking
mypy app/
```

---

## Deployment

### Production Checklist
- [ ] Set up production MongoDB instance
- [ ] Configure environment variables securely
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Monitor API usage (Anthropic, Context7)
- [ ] Implement logging and error tracking
- [ ] Configure CORS for production domains

### Docker Deployment

Docker setup is available for local development and production:

```bash
# Development (with hot reload)
docker-compose up -d

# Production (requires configuration updates)
# - Change MongoDB credentials
# - Remove --reload flag
# - Set up reverse proxy (nginx/Traefik)
# - Enable HTTPS
# - Configure secrets management
```

See [DOCKER.md](DOCKER.md) for complete Docker documentation.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes in the appropriate folder (backend/, frontend/, qa/)
4. Test thoroughly
5. Submit a pull request

---

## Team

- **Backend**: Production-ready FastAPI + AI Agent
- **Frontend**: TBD
- **QA**: TBD

---

## License

MIT License

---

## Support

For issues or questions, open a GitHub issue or contact the team.
