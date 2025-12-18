# University Aggregator

A full-stack platform for exploring universities worldwide with AI-powered recommendations.

---

## Project Overview

University Aggregator is an educational catalog that helps students discover universities, understand admission requirements, and receive personalized AI recommendations based on their academic profile.

---

## Features

### Frontend Application
- Modern, minimalist UI with Material Design
- Browse universities with detailed information
- Filter by country and specialty
- Search universities by name
- View detailed university pages with admission requirements
- Responsive design for mobile and desktop
- AI-powered chat assistant for personalized recommendations
- Real-time API integration with backend

### Backend API
- RESTful API with automatic documentation
- CRUD operations for universities and specialties
- Advanced filtering, sorting, and pagination
- Many-to-Many relationship (Universities ↔ Specialties)
- MongoDB with Beanie ODM
- Docker support with Mongo Express UI

### AI Agent (Production-Ready)
- Personalized university recommendations
- Intelligent comparison between universities
- Context-aware conversations
- Realistic admission chance assessment
- Application guidance and advice
- Natural language understanding powered by OpenAI GPT models

### Quality Assurance
- E2E tests with Playwright
- API validation tests
- UI component tests
- Filter and search functionality tests
- AI chat integration tests

---

## Tech Stack

### Backend
- **Python 3.11+**
- **FastAPI** - Modern async web framework
- **MongoDB** - NoSQL database
- **Beanie ODM** - Async MongoDB object-document mapper
- **OpenAI API** - AI for recommendations and chat

### Frontend
- **React 19** - Latest version with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and caching
- **Material UI v7** - Modern component library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hot Toast** - Notifications
- **React Markdown** - Markdown rendering for AI responses

### QA
- **Playwright** - E2E testing framework
- **Node.js** - Test execution environment

---

## Project Structure

```
ai-project/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI application entry point
│   │   ├── core/           # Configuration
│   │   ├── db/             # Database connection
│   │   ├── models/         # Beanie ODM models
│   │   ├── services/       # Business logic
│   │   ├── routers/        # API endpoints
│   │   └── ai/             # AI agent logic
│   ├── sample_data/        # Seed data for MongoDB
│   ├── docker-compose.yml  # Docker setup
│   ├── requirements.txt
│   └── .env.example
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # TanStack Router definitions
│   │   ├── types/          # TypeScript types
│   │   ├── lib/            # Utilities and API client
│   │   ├── theme/          # MUI theme configuration
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── qa/                     # E2E tests
│   ├── tests/
│   │   ├── universities.spec.ts
│   │   ├── ai.spec.ts
│   │   └── helpers/
│   ├── playwright.config.js
│   └── package.json
├── agent.md                # AI agent documentation
└── README.md               # This file
```

---

## Getting Started

### Prerequisites
- **Docker Desktop** (for backend with Docker)
- **Python 3.11+** (for backend without Docker)
- **Node.js 18+** (for frontend)
- **Yarn** (for frontend)
- **OpenAI API key** (for AI features)

### Quick Start - Full Stack

#### 1. Backend Setup (Docker - Recommended)

```bash
# Navigate to backend directory
cd backend

# Configure environment
cp .env.example .env
# Edit .env and add your API key:
# OPENAI_API_KEY=your_key_here

# Start backend and MongoDB
docker-compose up -d

# Verify backend is running
curl http://localhost:8000/docs
```

Backend will be available at:
- API: http://localhost:8000/docs
- Mongo Express: http://localhost:8081 (admin/admin123)

See [backend/DOCKER.md](backend/DOCKER.md) for detailed Docker documentation.

#### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Configure environment (optional)
cp .env.example .env.local

# Start development server
yarn dev
```

Frontend will be available at: http://localhost:5173

#### 3. Running Tests

```bash
# Navigate to QA directory
cd qa

# Install dependencies
npm install

# Configure environment (optional)
cp env.example .env

# Make sure backend and frontend are running, then:
npm test                # Run all tests
npm run test:headed     # Run with browser visible
npm run test:ui         # Run with Playwright UI
```

### Alternative: Local Backend Setup (Without Docker)

If you prefer to run the backend without Docker:

```bash
# 1. Make sure MongoDB is running locally or accessible remotely

# 2. Navigate to backend directory
cd backend

# 3. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Configure environment
cp .env.example .env
# Edit .env with your configuration

# 6. Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## Service URLs

When running locally:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **API Documentation**: http://localhost:8000/redoc (ReDoc)
- **Mongo Express**: http://localhost:8081 (admin/admin123)

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
1. **OpenAI GPT models** for intelligent analysis and natural language responses
2. **MongoDB** for fetching relevant university data
3. **Session management** for tracking user conversations

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

## Documentation

This project includes comprehensive documentation:

### Root Level
- **[agent.md](agent.md)** - Complete AI agent documentation and architecture

### Backend
- **[backend/DOCKER.md](backend/DOCKER.md)** - Docker setup and deployment guide

### Frontend
- **[frontend/README.md](frontend/README.md)** - Frontend setup and development guide
- **[frontend/QUICK_START.md](frontend/QUICK_START.md)** - Quick start guide for frontend
- **[frontend/SETUP.md](frontend/SETUP.md)** - Detailed setup instructions
- **[frontend/COMPONENT_ARCHITECTURE.md](frontend/COMPONENT_ARCHITECTURE.md)** - Component design patterns
- **[frontend/COMPONENTS.md](frontend/COMPONENTS.md)** - Component documentation
- **[frontend/PROJECT_SUMMARY.md](frontend/PROJECT_SUMMARY.md)** - Project overview
- **[frontend/UNIVERSITIES_FEATURE.md](frontend/UNIVERSITIES_FEATURE.md)** - Universities feature documentation
- **[frontend/TESTING_CHECKLIST.md](frontend/TESTING_CHECKLIST.md)** - Testing guidelines
- **[frontend/VISUAL_STRUCTURE.md](frontend/VISUAL_STRUCTURE.md)** - UI/UX structure

### QA
- **[qa/README.md](qa/README.md)** - E2E testing guide
- **[qa/WORKFLOW.md](qa/WORKFLOW.md)** - QA workflow documentation

---

## Development

### Backend Development

#### Running Tests
```bash
cd backend
pytest tests/
```

#### Code Quality
```bash
# Format code
black app/

# Lint
flake8 app/

# Type checking
mypy app/
```

### Frontend Development

#### Running in Development Mode
```bash
cd frontend
yarn dev
```

#### Build and Preview
```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

#### Code Quality
```bash
# Lint
yarn lint
```

#### Available Frontend Scripts
- `yarn dev` - Start development server with HMR
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

### QA Development

#### Running Tests
```bash
cd qa
npm test                # Run all tests
npm run test:headed     # Run with browser visible
npm run test:ui         # Run with Playwright UI
npm run test:debug      # Debug tests
npm run report          # View test report
```

---

## Deployment

### Production Checklist

#### Backend
- [ ] Set up production MongoDB instance (MongoDB Atlas recommended)
- [ ] Configure environment variables securely
- [ ] Enable HTTPS with SSL certificates
- [ ] Set up rate limiting
- [ ] Monitor API usage (OpenAI API)
- [ ] Implement logging and error tracking
- [ ] Configure CORS for production domains
- [ ] Remove debug/development flags
- [ ] Set up health check endpoints

#### Frontend
- [ ] Build production bundle (`yarn build`)
- [ ] Configure environment variables for production API
- [ ] Deploy to hosting platform (Vercel, Netlify, or AWS S3 + CloudFront)
- [ ] Set up CDN for static assets
- [ ] Configure analytics and error tracking
- [ ] Enable gzip/brotli compression
- [ ] Set up proper cache headers

#### QA
- [ ] Run full test suite before deployment
- [ ] Set up CI/CD pipeline with automated testing
- [ ] Configure test environments

### Backend Docker Deployment

Docker setup is available for local development and production:

```bash
# Development (with hot reload)
cd backend
docker-compose up -d

# Production (requires configuration updates)
# - Change MongoDB credentials
# - Remove --reload flag
# - Set up reverse proxy (nginx/Traefik)
# - Enable HTTPS
# - Configure secrets management
```

See [backend/DOCKER.md](backend/DOCKER.md) for complete Docker documentation.

### Frontend Deployment

The frontend can be deployed to various platforms:

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

#### Netlify
```bash
# Build
cd frontend
yarn build

# Deploy dist/ folder to Netlify
```

#### Docker (Alternative)
Create a `Dockerfile` in the frontend directory for containerized deployment.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes in the appropriate folder (backend/, frontend/, qa/)
4. Test thoroughly
5. Submit a pull request

---

## Team Structure

- **Backend**: Production-ready FastAPI + MongoDB + AI Agent integration
- **Frontend**: Modern React application with Material UI and TanStack ecosystem
- **QA**: Comprehensive E2E testing with Playwright

---

## License

MIT License

---

## Support

For issues or questions, open a GitHub issue or contact the team.
