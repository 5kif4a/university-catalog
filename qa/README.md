# University Catalog QA

E2E testing suite for University Catalog application using Playwright.

## Setup

1. Install dependencies:
```bash
npm install
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

Tests are organized in `tests/universities.spec.ts` and cover:

- **Universities List**: Display and navigation
- **University Page**: Individual university details and requirements
- **Country Filter**: Filtering universities by country
- **Specialization Filter**: Filtering by academic programs
- **Empty State**: Handling no results scenarios
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
