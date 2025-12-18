# University Aggregator - Component Architecture

## Component Hierarchy

```
App (Root)
│
├── Navigation (Global)
│   └── Links: Home | Universities | About | Users
│
├── HomePage (/)
│   ├── Hero Section
│   │   ├── Title
│   │   ├── Description
│   │   └── CTA Buttons
│   │       ├── "Explore Universities" -> /universities
│   │       └── "Learn More" -> /about
│   └── Feature Cards Grid
│
├── UniversitiesPage (/universities)
│   ├── Page Header
│   │   ├── Title: "Explore Universities"
│   │   └── Description
│   └── UniversityList
│       ├── UniversityFilters
│       │   ├── Country Select (MUI)
│       │   ├── Specialty Select (MUI)
│       │   └── Active Filter Chips
│       ├── Results Header (count + message)
│       └── University Grid
│           └── UniversityCard (x6)
│               ├── Logo/Icon
│               ├── Ranking Badge
│               ├── Name
│               ├── Location
│               ├── Specialty Chips
│               ├── Min Score
│               └── "View Details" Button
│
└── UniversityDetailPage (/universities/:id)
    ├── Back Button -> /universities
    ├── Hero Section
    │   ├── University Logo
    │   ├── Name
    │   ├── Location
    │   ├── Ranking
    │   ├── "Visit Website" Button
    │   └── Specialty Chips
    └── Content Grid (2 columns)
        ├── Left Column (8/12)
        │   ├── About Card
        │   │   └── Description
        │   ├── Required Exams Card
        │   │   └── Exam List (with scores & required status)
        │   └── Required Documents Card
        │       └── Document Checklist
        └── Right Column (4/12)
            ├── Score Requirements Card
            │   ├── Min Score
            │   └── Max Score
            ├── Application Deadline Card
            │   └── Formatted Date
            ├── Tuition Fees Card
            │   └── Fee Range
            └── "Apply Now" Button
```

## Data Flow

```
Mock Data (/src/mock/universities.ts)
    │
    ├── mockUniversities: University[]
    ├── countries: string[]
    └── specialties: string[]
    │
    ↓
UniversitiesPage
    │
    ├── Props → UniversityList
    │   │   ├── universities
    │   │   ├── countries
    │   │   └── specialties
    │   │
    │   └── Local State (useState)
    │       └── filters: { country?, specialty? }
    │           │
    │           ├── Props → UniversityFilters
    │           │   ├── filters
    │           │   ├── onChange
    │           │   ├── countries
    │           │   └── specialties
    │           │
    │           └── Derived State (useMemo)
    │               └── filteredUniversities
    │                   │
    │                   └── Props → UniversityCard
    │                       └── university
    │
    └── Navigation (Link) → UniversityDetailPage
        │
        ├── URL Param: id
        └── Data: mockUniversities.find(u => u.id === id)
```

## State Management Strategy

### Local State (useState)
- **UniversityList**: Filter state
- Future: Loading states, error states

### Derived State (useMemo)
- **UniversityList**: Filtered university list
- Recalculates only when filters or data change

### No Global State Yet
- Not needed for current feature set
- All data is read-only mock data
- No user preferences to persist

### Future State Needs
- User authentication state (Context/Zustand)
- Favorite universities (Local Storage)
- Application progress (API + Local)

## Component Responsibility Matrix

| Component | Data Fetching | State Management | Rendering | Navigation |
|-----------|--------------|------------------|-----------|------------|
| UniversityCard | No | No | Yes | Yes (Link) |
| UniversityFilters | No | Yes (callbacks) | Yes | No |
| UniversityList | No | Yes (local) | Yes | No |
| UniversitiesPage | Yes (mock) | No | Yes | No |
| UniversityDetailPage | Yes (mock) | No | Yes | Yes (back) |
| Navigation | No | No | Yes | Yes (links) |

## Props Interface Summary

### UniversityCard
```typescript
interface UniversityCardProps {
  university: University;
}
```

### UniversityFilters
```typescript
interface UniversityFiltersProps {
  filters: UniversityFilters;
  onChange: (filters: UniversityFilters) => void;
  countries: string[];
  specialties: string[];
}
```

### UniversityList
```typescript
interface UniversityListProps {
  universities: University[];
  countries: string[];
  specialties: string[];
}
```

## Type System

### Core Types
```typescript
// University domain model
interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  description: string;
  logo?: string;
  website: string;
  ranking?: number;
  specialties: string[];
  requirements: UniversityRequirements;
}

// University requirements
interface UniversityRequirements {
  minScore: number;
  maxScore: number;
  exams: Exam[];
  documents: string[];
  applicationDeadline: string;
  tuitionFee?: {
    min: number;
    max: number;
    currency: string;
  };
}

// Exam details
interface Exam {
  name: string;
  minScore: number;
  required: boolean;
}

// Filter state
interface UniversityFilters {
  country?: string;
  specialty?: string;
  minScore?: number;
  maxScore?: number;
}
```

## Styling Architecture

### Approach: Hybrid (MUI + Tailwind)

#### MUI Components
- Card, CardContent, CardMedia
- Typography
- Button
- Chip
- Select, MenuItem, FormControl
- Grid, Box, Container
- AppBar, Toolbar
- Icons from @mui/icons-material

#### Tailwind Utilities
- Spacing: `p-4`, `m-2`, `gap-3`
- Flexbox/Grid: `flex`, `grid`, `grid-cols-3`
- Sizing: `h-48`, `w-32`
- Colors: `bg-slate-50`, `text-slate-900`
- Borders: `border`, `rounded-lg`
- Shadows: `shadow-sm`, `shadow-lg`
- Responsive: `md:grid-cols-2`, `lg:grid-cols-3`

#### Custom Styles (sx prop)
- Hover effects
- Transitions
- Theme colors
- Font weights

### Color Palette
```
Primary: MUI theme primary (blue)
Background: slate-50 (#f8fafc)
Card: white (#ffffff)
Text Primary: slate-900
Text Secondary: slate-600
Border: slate-200
Success: green
Error: red
Warning: amber (#f59e0b for ranking badge)
```

## Routing Strategy

### File-based Routing (TanStack Router)

```
/src/routes/
├── __root.tsx          → Root layout
├── index.tsx           → HomePage (/)
├── universities.tsx    → UniversitiesPage (/universities)
├── universities.$id.tsx → UniversityDetailPage (/universities/:id)
├── about.tsx           → AboutPage (/about)
└── users.tsx           → UsersPage (/users)
```

### Route Configuration
```typescript
// Static route
export const Route = createFileRoute('/universities')({
  component: UniversitiesPage,
});

// Dynamic route
export const Route = createFileRoute('/universities/$id')({
  component: UniversityDetailPage,
});
```

### Navigation Methods
```tsx
// Link component
<Link to="/universities">Universities</Link>

// Dynamic route
<Link to="/universities/$id" params={{ id: '1' }}>View</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate({ to: '/universities' });

// Back navigation
<Button component={Link} to="/universities">Back</Button>
```

## Performance Considerations

### Current Optimizations
1. **useMemo** for filtered lists
2. **Lazy loading** for images (loading="lazy")
3. **CSS transforms** for animations (GPU accelerated)
4. **Code splitting** via route-based splitting
5. **Efficient rendering** with key props

### Performance Checklist
- [x] Memoized expensive calculations
- [x] Lazy loaded images
- [x] Efficient list rendering
- [x] Route-based code splitting
- [ ] Virtual scrolling (not needed yet)
- [ ] React.memo on components
- [ ] Suspense boundaries
- [ ] Image optimization

### Performance Metrics Goals
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.0s
- **CLS** (Cumulative Layout Shift): < 0.1

## Accessibility Features

### WCAG 2.1 Level AA Compliance

#### Implemented
- [x] Semantic HTML (nav, main, article, section)
- [x] Heading hierarchy (h1, h2, h3, h4, h5, h6)
- [x] Alt text on images
- [x] ARIA labels on icons
- [x] ARIA live regions (filter results)
- [x] Form labels (Select components)
- [x] Keyboard navigation (native MUI support)
- [x] Focus indicators (MUI default)
- [x] Color contrast (meets WCAG AA)

#### Testing Checklist
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Keyboard-only navigation
- [ ] Color contrast verification
- [ ] Focus order verification
- [ ] ARIA attribute validation
- [ ] Form error handling
- [ ] Skip to content link

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate select dropdowns
- **Escape**: Close dropdowns/modals

## Component Reusability

### Reusable Components
1. **Navigation** - Used on all pages
2. **UniversityCard** - Can be used in favorites, search results
3. **UniversityFilters** - Can be enhanced for advanced search
4. **FeatureCard** - General purpose feature display

### Single-purpose Components
1. **UniversityList** - Specific to universities page
2. **UniversitiesPage** - Route-specific page
3. **UniversityDetailPage** - Route-specific page

### Future Reusable Components
- LoadingSpinner
- ErrorBoundary
- EmptyState
- SearchInput
- RangeSlider (for score/tuition filters)
- ComparisonTable
- ReviewCard

## Testing Strategy

### Current State
- No automated tests yet
- Manual testing only

### Recommended Testing Approach

#### Unit Tests (Vitest + React Testing Library)
```typescript
// UniversityCard.test.tsx
describe('UniversityCard', () => {
  it('renders university name', () => {});
  it('displays ranking badge when ranking exists', () => {});
  it('navigates to detail page on click', () => {});
});

// UniversityFilters.test.tsx
describe('UniversityFilters', () => {
  it('calls onChange when country changes', () => {});
  it('displays active filter chips', () => {});
  it('clears filter when chip is deleted', () => {});
});
```

#### Integration Tests
```typescript
// UniversityList.test.tsx
describe('UniversityList', () => {
  it('filters universities by country', () => {});
  it('filters universities by specialty', () => {});
  it('shows empty state when no results', () => {});
});
```

#### E2E Tests (Playwright)
```typescript
test('user can filter universities', async ({ page }) => {
  await page.goto('/universities');
  await page.selectOption('#country-filter', 'USA');
  await expect(page.locator('.university-card')).toHaveCount(2);
});
```

## Code Quality Standards

### ESLint Rules
- TypeScript strict mode
- React hooks rules
- Import order
- No unused vars
- No console.log in production

### Code Style
- Functional components only
- Named exports for pages/components
- Default exports for route files
- Props interfaces defined inline or above component
- Comments for complex logic

### File Organization
```
ComponentName.tsx
├── Imports (grouped: React, MUI, Router, Types, Components)
├── Types/Interfaces
├── JSDoc comment
├── Component definition
├── Helper functions (if any)
└── Export
```

## Future Architecture Improvements

### When to Introduce
1. **Context API**: When need to share user auth state
2. **Zustand**: When local state becomes complex
3. **TanStack Query**: When adding API integration
4. **React Hook Form**: When adding complex forms
5. **Zod**: For runtime validation
6. **Storybook**: For component documentation

### Refactoring Opportunities
1. Extract filter logic to custom hook
2. Create generic FilterSelect component
3. Add error boundaries around routes
4. Create layout components for page structure
5. Abstract card patterns into generic Card component
