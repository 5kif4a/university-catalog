# QA Workflow Documentation

## University Catalog E2E Testing Strategy

### Overview
This document outlines the QA workflow for the University Catalog project, focusing on end-to-end testing with Playwright to ensure product quality and user experience reliability.

### Test Coverage Areas

#### 1. Universities List (`universities-list-test`)
- **Purpose**: Verify universities are displayed correctly in list view
- **Key Elements**:
  - Universities list container (`[data-testid="universities-list"]`)
  - Individual university cards (`[data-testid="university-card"]`)
  - University name and country display
- **Edge Cases**: Empty list, loading states

#### 2. University Detail Page (`university-page-test`)
- **Purpose**: Ensure individual university pages load and display complete information
- **Key Elements**:
  - University detail container (`[data-testid="university-detail"]`)
  - Requirements section (`[data-testid="requirements-section"]`)
  - Programs/Specializations section (`[data-testid="programs-section"]`)
- **Edge Cases**: Invalid university ID, missing data

#### 3. Country Filter (`country-filter-test`)
- **Purpose**: Validate filtering functionality by country
- **Key Elements**:
  - Country filter dropdown (`[data-testid="country-filter"]`)
  - Country options (`[data-testid="country-option-*"]`)
  - Clear filter functionality
- **Edge Cases**: No universities in selected country, filter reset

#### 4. Specialization Filter (`specialization-filter-test`)
- **Purpose**: Test filtering by academic specialization
- **Key Elements**:
  - Specialization filter (`[data-testid="specialization-filter"]`)
  - Multiple selection capability
  - Filter combination with country filter
- **Edge Cases**: No matches, multiple selections, filter conflicts

#### 5. Empty State (`empty-state-test`)
- **Purpose**: Ensure graceful handling when no results are found
- **Key Elements**:
  - Empty state container (`[data-testid="empty-state"]`)
  - Empty state message (`[data-testid="empty-state-message"]`)
- **Triggers**: No filter matches, empty search results, API failures

#### 6. AI Chat Interaction (`ai-chat-test`)
- **Purpose**: Basic UI validation for AI assistant component
- **Key Elements**:
  - Chat container (`[data-testid="ai-chat"]`)
  - Chat input field (`[data-testid="chat-input"]`)
  - Chat messages area (`[data-testid="chat-messages"]`)
  - Send button (`[data-testid="send-message-btn"]`)
- **Note**: UI-only testing, backend AI integration tested separately

### Testing Strategy

#### Test Organization
- **File Structure**: `tests/universities.spec.ts`
- **Grouping**: Tests grouped by feature area using `test.describe()`
- **Selectors**: Exclusive use of `data-testid` attributes for reliable selection

#### Execution Strategy
- **Parallel Execution**: Tests run in parallel for efficiency
- **Browser Coverage**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **CI Integration**: Retry logic enabled for CI environments
- **Local Development**: Single retry with trace collection on failure

#### Test Data Strategy
- **Isolation**: Each test should be independent
- **State Management**: Tests should not rely on specific data order
- **Mock Data**: Use realistic test data that covers edge cases

### Development Workflow

#### Pre-commit Checklist
- [ ] Run full test suite locally: `npm test`
- [ ] Check for linting errors: `npm run lint`
- [ ] Verify tests pass in at least one browser
- [ ] Update test documentation for any new data-testid attributes

#### CI/CD Integration
- **Trigger**: Push to main branch or PR creation
- **Environment**: Isolated test environment with fresh database
- **Reporting**: HTML reports generated and archived
- **Failure Handling**: Block merges on test failures

#### Test Maintenance
- **Regular Review**: Monthly review of test coverage and effectiveness
- **Refactoring**: Update tests when UI changes affect selectors
- **Performance**: Monitor test execution time and optimize slow tests

### AI-Assisted Testing Workflow

#### Context7 Integration
- **Library Research**: Use Context7 for researching testing best practices
- **API Documentation**: Reference Playwright API docs through Context7
- **Framework Updates**: Stay current with Playwright releases

#### MCP Usage
- **Browser Automation**: Playwright MCP for complex interaction sequences
- **Screenshot Analysis**: Visual regression testing capabilities
- **Network Monitoring**: API call validation during tests

### Quality Gates

#### Code Quality
- [ ] All tests use `data-testid` selectors
- [ ] No hardcoded timeouts (use `expect` with proper waits)
- [ ] Tests are readable and self-documenting
- [ ] No test.skip or test.only in committed code

#### Coverage Requirements
- [ ] All user-facing features have corresponding tests
- [ ] Critical user flows tested end-to-end
- [ ] Error states and edge cases covered
- [ ] Mobile responsiveness tested

### Troubleshooting

#### Common Issues
- **Flaky Tests**: Use proper wait strategies, avoid race conditions
- **Selector Issues**: Prefer `data-testid` over CSS selectors
- **Timing Issues**: Use `page.waitForLoadState()` for navigation
- **Environment Issues**: Ensure consistent test data across environments

#### Debug Tools
- **UI Mode**: `npm run test:ui` for interactive debugging
- **Headed Mode**: `npm run test:headed` to see browser actions
- **Trace Viewer**: Automatic traces on test failures
- **Network Logs**: Browser dev tools for API debugging

### Metrics & Reporting

#### Test Metrics
- **Pass Rate**: Target >95% pass rate
- **Execution Time**: Monitor and optimize slow tests
- **Flakiness**: Track and fix flaky tests (<5% failure rate)

#### Reporting
- **HTML Reports**: Generated after each test run
- **CI Integration**: Test results posted to PRs
- **Coverage Reports**: Code coverage integration planned

---

*This workflow document is maintained by the QA Agent and should be updated with any changes to testing strategy or processes.*
