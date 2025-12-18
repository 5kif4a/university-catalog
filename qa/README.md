# University Catalog QA

E2E testing suite for University Catalog application using Playwright.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
```bash
cp env.example .env
# Edit .env file with your configuration
```

## Environment Variables

Tests support the following environment variables:

- `BASE_URL` - Base URL for frontend application (default: `http://localhost:3000`)
- `API_URL` - API URL for backend requests (default: `http://localhost:8000`)

## Running Tests

**Note**: Make sure frontend and backend servers are running before executing tests, as webServer auto-start has been disabled.

Example `.env` file:
```
BASE_URL=http://localhost:3000
API_URL=http://localhost:8000
```

## Running Tests

### All tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Debug tests
```bash
npm run test:debug
```

### View test report
```bash
npm run report
```

## Test Structure

Tests are organized in the following files:

### `tests/universities.spec.ts`
- Universities List: Display and navigation
- University Page: Individual university details, requirements, and API-UI data matching
- Country Filter: Filtering universities by country
- Specialization Filter: Filtering by academic programs and API-UI consistency
- Empty State: Handling no results scenarios and API-UI consistency
- Search: University search functionality and results validation
- AI Chat: Basic UI interaction for AI assistant

### `tests/ai.spec.ts`
- AI Agent API Tests: Health checks and recommendation functionality

### Test Coverage

### Helpers
- `tests/helpers/api.ts` - API utility functions for backend communication

### Test Coverage

- **Universities List**: Display and navigation
- **University Page**: Individual university details, requirements, and API-UI data matching
- **Country Filter**: Filtering universities by country
- **Specialization Filter**: Filtering by academic programs and API-UI consistency
- **Empty State**: Handling no results scenarios and API-UI consistency
- **Search**: University search functionality and results validation
- **AI Chat**: Basic UI interaction for AI assistant

## Data Test IDs

Tests use `data-testid` attributes for reliable element selection:

- `universities-list` - Main universities container
- `university-card` - Individual university card
- `university-name` - University name element
- `university-country` - Country information
- `country-filter` - Country filter dropdown
- `specialization-filter` - Specialization filter
- `empty-state` - Empty state container
- `ai-chat` - AI chat component
- `chat-input` - Chat input field

## TODO Items

⚠️ **Note**: Many tests contain TODO comments because the UI components are not yet implemented. These tests will need to be updated once the frontend is ready.

## CI/CD

Tests are configured to run in parallel and include proper retry logic for CI environments.
