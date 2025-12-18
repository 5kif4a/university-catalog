# Quick Start Guide - University Aggregator

## Get Started in 3 Steps

### 1. Start the Development Server

```bash
cd /Users/alikhan_shorin/Documents/personal/university-catalog/frontend
yarn dev
```

The app will be available at `http://localhost:5173`

### 2. Navigate to Universities

Click "Explore Universities" button on the homepage or go directly to:
```
http://localhost:5173/universities
```

### 3. Test the Features

#### Filter Universities
- Select a country from the dropdown
- Select a specialty from the dropdown
- Remove filters by clicking the X on filter chips

#### View University Details
- Click on any university card
- Click "View Details" button
- URL will be `/universities/:id`

#### Navigate Back
- Click "Back to Universities" button
- Or use browser back button
- Or click "Universities" in the navigation

## Project Structure

```
frontend/src/
├── components/
│   ├── UniversityCard.tsx      # University card for list view
│   ├── UniversityFilters.tsx   # Filter controls
│   ├── UniversityList.tsx      # List with integrated filtering
│   └── Navigation.tsx          # Updated with Universities link
├── pages/
│   ├── HomePage.tsx            # Updated with CTA button
│   ├── UniversitiesPage.tsx    # List page
│   └── UniversityDetailPage.tsx # Detail page
├── routes/
│   ├── universities.tsx        # List route
│   └── universities.$id.tsx    # Detail route (dynamic)
├── types/
│   └── university.ts           # TypeScript types
└── mock/
    └── universities.ts         # Mock data (6 universities)
```

## Available Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Landing page with CTA |
| `/universities` | UniversitiesPage | List of all universities |
| `/universities/1` | UniversityDetailPage | MIT details |
| `/universities/2` | UniversityDetailPage | Stanford details |
| `/universities/3` | UniversityDetailPage | Oxford details |
| `/universities/4` | UniversityDetailPage | ETH Zurich details |
| `/universities/5` | UniversityDetailPage | Tokyo details |
| `/universities/6` | UniversityDetailPage | NUS details |
| `/about` | AboutPage | About page |
| `/users` | UsersPage | Users page (demo) |

## Mock Data Overview

### Universities by Country
- **USA**: MIT, Stanford
- **UK**: Oxford
- **Switzerland**: ETH Zurich
- **Japan**: University of Tokyo
- **Singapore**: NUS

### Available Specialties
- Business
- Computer Science
- Economics
- Engineering
- History
- Law
- Mathematics
- Medicine
- Philosophy
- Physics
- Science

## Component Usage Examples

### UniversityCard

```tsx
import { UniversityCard } from '@/components';
import { mockUniversities } from '@/mock/universities';

function MyComponent() {
  const university = mockUniversities[0]; // MIT

  return <UniversityCard university={university} />;
}
```

### UniversityFilters

```tsx
import { UniversityFilters } from '@/components';
import { useState } from 'react';

function MyComponent() {
  const [filters, setFilters] = useState({});
  const countries = ['USA', 'UK'];
  const specialties = ['Computer Science', 'Engineering'];

  return (
    <UniversityFilters
      filters={filters}
      onChange={setFilters}
      countries={countries}
      specialties={specialties}
    />
  );
}
```

### UniversityList

```tsx
import { UniversityList } from '@/components';
import { mockUniversities, countries, specialties } from '@/mock/universities';

function MyComponent() {
  return (
    <UniversityList
      universities={mockUniversities}
      countries={countries}
      specialties={specialties}
    />
  );
}
```

## Testing Checklist

### Manual Testing Steps

1. **Homepage**
   - [ ] Page loads without errors
   - [ ] "Explore Universities" button is visible
   - [ ] Button navigates to /universities

2. **Universities List Page**
   - [ ] All 6 universities are displayed
   - [ ] University cards show logo/icon
   - [ ] Ranking badges are visible
   - [ ] Location is displayed
   - [ ] Specialty chips are shown
   - [ ] Minimum score is visible

3. **Filtering**
   - [ ] Country filter dropdown works
   - [ ] Specialty filter dropdown works
   - [ ] Filtering USA shows MIT + Stanford
   - [ ] Filtering UK shows Oxford
   - [ ] Filtering Computer Science shows MIT, Stanford, ETH, NUS
   - [ ] Filtering Engineering shows all except Oxford
   - [ ] Combined filters work (e.g., USA + Computer Science = MIT + Stanford)
   - [ ] Active filter chips appear
   - [ ] Clicking X on chip removes filter
   - [ ] Result count updates correctly
   - [ ] Empty state shows when no matches

4. **University Detail Page**
   - [ ] Clicking card navigates to detail page
   - [ ] University logo displays
   - [ ] All university info is visible
   - [ ] Description section shows
   - [ ] Exams section shows with scores
   - [ ] Documents section shows checklist
   - [ ] Score requirements card shows
   - [ ] Application deadline shows formatted date
   - [ ] Tuition fees show (if available)
   - [ ] "Visit Website" link works (opens new tab)
   - [ ] "Back to Universities" button works
   - [ ] "Apply Now" button is visible

5. **Navigation**
   - [ ] Navigation bar is visible on all pages
   - [ ] All nav links work
   - [ ] Active page is highlighted (if implemented)

6. **Responsive Design**
   - [ ] Mobile (< 600px): 1 column grid
   - [ ] Tablet (600-1200px): 2 column grid
   - [ ] Desktop (> 1200px): 3 column grid
   - [ ] Detail page: Single column on mobile, 2 columns on desktop
   - [ ] Navigation is responsive

7. **Hover Effects**
   - [ ] University cards scale on hover
   - [ ] Buttons show hover state
   - [ ] Links show hover state

8. **Accessibility**
   - [ ] All images have alt text
   - [ ] Keyboard navigation works (Tab, Enter)
   - [ ] Focus indicators are visible
   - [ ] Headings are in proper order
   - [ ] Screen reader friendly (if tested)

## Common Issues & Solutions

### Issue: Universities not displaying
**Solution**: Check that mock data is imported correctly:
```tsx
import { mockUniversities } from '@/mock/universities';
```

### Issue: Filters not working
**Solution**: Verify filter state is being updated:
```tsx
const [filters, setFilters] = useState<UniversityFilters>({});
```

### Issue: Detail page shows 404
**Solution**: Check that university ID exists in mock data (1-6)

### Issue: Images not loading
**Solution**: Mock data uses external URLs from Wikipedia. Check internet connection.

### Issue: Routing not working
**Solution**: Ensure TanStack Router is configured correctly in main.tsx

## Development Commands

```bash
# Start dev server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint

# Type check
yarn type-check
```

## Environment Variables

Currently no environment variables needed. All data is mocked locally.

Future API integration will require:
```env
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your_api_key_here
```

## Next Steps

### For Development
1. Run `yarn dev`
2. Open `http://localhost:5173`
3. Navigate to `/universities`
4. Test filtering and detail pages

### For API Integration
1. Create API client in `/src/api/`
2. Create TanStack Query hooks in `/src/hooks/`
3. Replace mock data with API calls
4. Add loading states
5. Add error handling
6. Add pagination

### For Enhancement
1. Add search functionality
2. Add sorting options
3. Add favorites feature
4. Add comparison feature
5. Add user authentication
6. Add application tracking

## Support & Documentation

- **Full Documentation**: See `UNIVERSITIES_FEATURE.md`
- **Architecture Guide**: See `COMPONENT_ARCHITECTURE.md`
- **Types Reference**: See `src/types/university.ts`
- **Mock Data**: See `src/mock/universities.ts`

## Contact

For questions or issues, refer to the project documentation or create an issue in the repository.
