# University Aggregator - Testing Checklist

## Pre-Testing Setup

- [ ] Navigate to frontend directory: `cd /Users/alikhan_shorin/Documents/personal/ai-project/frontend`
- [ ] Install dependencies (if not done): `yarn install`
- [ ] Start dev server: `yarn dev`
- [ ] Open browser to: `http://localhost:5173`

## 1. Homepage Tests

### Layout & Content
- [ ] Page loads without errors
- [ ] Navigation bar is visible
- [ ] "AI Project" logo/title is displayed
- [ ] Navigation links are visible: Home, Universities, About, Users
- [ ] Hero section displays title: "Welcome to AI Project"
- [ ] Hero section displays description
- [ ] "Explore Universities" button is visible
- [ ] "Learn More" button is visible
- [ ] Feature cards grid displays (3 cards)

### Interaction
- [ ] Clicking "Explore Universities" navigates to `/universities`
- [ ] Clicking "Learn More" navigates to `/about`
- [ ] All navigation links work
- [ ] Buttons show hover effects
- [ ] No console errors

### Responsive
- [ ] Mobile view (< 600px): Single column layout
- [ ] Tablet view (600-1200px): Proper spacing
- [ ] Desktop view (> 1200px): Full layout

## 2. Universities List Page Tests

### Layout & Content
- [ ] Page loads at `/universities`
- [ ] Navigation bar is present
- [ ] Page title: "Explore Universities" is visible
- [ ] Page description is visible
- [ ] Filter section is visible
- [ ] All 6 university cards display
- [ ] Result count shows: "6 Universities Found"

### University Cards
- [ ] Each card shows university logo or fallback icon
- [ ] Ranking badge displays on cards with ranking
- [ ] University name is visible
- [ ] Location (city, country) displays
- [ ] Specialty chips display (max 3 visible)
- [ ] "+N more" chip shows when > 3 specialties
- [ ] Minimum score displays
- [ ] "View Details" button is visible
- [ ] Cards have hover effect (scale/shadow)

### Specific University Checks
- [ ] MIT card: Logo, Rank #1, Cambridge MA, USA
- [ ] Stanford card: Logo, Rank #3, Stanford CA, USA
- [ ] Oxford card: Logo, Rank #2, Oxford, UK
- [ ] ETH Zurich card: Logo, Rank #7, Zurich, Switzerland
- [ ] Tokyo Univ card: Logo, Rank #23, Tokyo, Japan
- [ ] NUS card: Logo, Rank #11, Singapore

## 3. Filter Functionality Tests

### Country Filter
- [ ] Country dropdown displays
- [ ] Dropdown shows "All Countries" option
- [ ] All countries appear in dropdown: USA, UK, Switzerland, Japan, Singapore
- [ ] Selecting "USA" filters to show MIT + Stanford only (2 results)
- [ ] Selecting "UK" filters to show Oxford only (1 result)
- [ ] Selecting "Switzerland" filters to show ETH Zurich only (1 result)
- [ ] Selecting "Japan" filters to show Tokyo only (1 result)
- [ ] Selecting "Singapore" filters to show NUS only (1 result)
- [ ] Result count updates correctly
- [ ] Active filter chip appears: "Country: USA"

### Specialty Filter
- [ ] Specialty dropdown displays
- [ ] Dropdown shows "All Specialties" option
- [ ] All specialties appear in dropdown
- [ ] Selecting "Computer Science" shows MIT, Stanford, ETH, NUS (4 results)
- [ ] Selecting "Engineering" shows MIT, Stanford, ETH, Tokyo, NUS (5 results)
- [ ] Selecting "Medicine" shows Stanford, Oxford, Tokyo (3 results)
- [ ] Selecting "Law" shows Oxford, NUS (2 results)
- [ ] Selecting "Physics" shows MIT, ETH (2 results)
- [ ] Result count updates correctly
- [ ] Active filter chip appears: "Specialty: Computer Science"

### Combined Filters
- [ ] Select Country "USA" + Specialty "Computer Science" = MIT + Stanford (2 results)
- [ ] Select Country "USA" + Specialty "Medicine" = Stanford (1 result)
- [ ] Select Country "UK" + Specialty "Computer Science" = No results (0)
- [ ] Both filter chips appear when both filters active
- [ ] Result count reflects combined filtering

### Clear Filters
- [ ] Clicking X on country chip removes country filter
- [ ] Clicking X on specialty chip removes specialty filter
- [ ] Selecting "All Countries" clears country filter
- [ ] Selecting "All Specialties" clears specialty filter
- [ ] Clearing filters shows all 6 universities again
- [ ] Result count updates to 6

### Empty State
- [ ] Set filters that match nothing (e.g., UK + Computer Science)
- [ ] Empty state message displays: "No universities found"
- [ ] Helpful text appears: "Try adjusting your filters..."
- [ ] No university cards display
- [ ] Result count shows: "No universities found"

## 4. Navigation to Detail Page

### From List
- [ ] Clicking university card navigates to detail page
- [ ] Clicking "View Details" button navigates to detail page
- [ ] URL changes to `/universities/:id`
- [ ] Correct university loads based on card clicked

### Direct URL Access
- [ ] Navigate directly to `/universities/1` loads MIT
- [ ] Navigate directly to `/universities/2` loads Stanford
- [ ] Navigate directly to `/universities/3` loads Oxford
- [ ] Navigate directly to `/universities/4` loads ETH Zurich
- [ ] Navigate directly to `/universities/5` loads Tokyo
- [ ] Navigate directly to `/universities/6` loads NUS
- [ ] Navigate to `/universities/999` shows 404 state

## 5. University Detail Page Tests

### Layout & Content
- [ ] Navigation bar is present
- [ ] "Back to Universities" button is visible
- [ ] University logo displays (or fallback icon)
- [ ] University name displays as h1
- [ ] Location displays with icon
- [ ] Ranking displays (if available)
- [ ] "Visit Website" button displays
- [ ] All specialty chips display
- [ ] About section displays with description
- [ ] Required Exams section displays
- [ ] Required Documents section displays
- [ ] Score Requirements card displays (right column)
- [ ] Application Deadline card displays
- [ ] Tuition Fees card displays (if available)
- [ ] "Apply Now" button is visible

### Hero Section
- [ ] Logo/icon is centered and properly sized
- [ ] University name is prominent
- [ ] Location icon and text display
- [ ] Ranking badge shows (if university has ranking)
- [ ] "Visit Website" button is styled correctly
- [ ] Specialty chips wrap properly
- [ ] All elements align properly on mobile

### Content Sections

#### About Section
- [ ] Section title: "About" displays
- [ ] Full description text displays
- [ ] Text is readable and properly formatted

#### Required Exams Section
- [ ] Section title: "Required Exams" with icon displays
- [ ] All exams for university display
- [ ] Each exam shows name
- [ ] Each exam shows minimum score
- [ ] "Required" chip displays for required exams
- [ ] "Optional" chip displays for optional exams
- [ ] Required chips are styled differently (red) from optional

#### Required Documents Section
- [ ] Section title: "Required Documents" with icon displays
- [ ] All documents list with checkmarks
- [ ] Checkmark icon is green
- [ ] Documents are listed clearly

### Side Cards

#### Score Requirements Card
- [ ] Card displays with School icon
- [ ] "Score Requirements" title displays
- [ ] "Minimum Score" label and value display
- [ ] "Maximum Score" label and value display
- [ ] Numbers are prominent and readable

#### Application Deadline Card
- [ ] Card displays with Calendar icon
- [ ] "Application Deadline" title displays
- [ ] Date is formatted properly (Month Day, Year)
- [ ] Date is prominent and readable

#### Tuition Fees Card
- [ ] Card displays with Money icon
- [ ] "Tuition Fees" title displays
- [ ] "Annual Cost" label displays
- [ ] Fee range displays with currency
- [ ] Numbers formatted with commas

### Interactions
- [ ] "Back to Universities" navigates to `/universities`
- [ ] "Visit Website" opens external link in new tab
- [ ] External link has correct URL for university
- [ ] "Apply Now" button is clickable (even if no action yet)
- [ ] All links and buttons show hover effects
- [ ] No console errors

### Specific University Data Checks

#### MIT (ID: 1)
- [ ] Name: "Massachusetts Institute of Technology"
- [ ] Location: Cambridge, Massachusetts, USA
- [ ] Ranking: #1
- [ ] Specialties: Computer Science, Engineering, Physics, Mathematics
- [ ] Min Score: 1500, Max Score: 1600
- [ ] Exams: SAT (1500, required), TOEFL (90, required)
- [ ] Documents: 4 items
- [ ] Deadline: January 1, 2024
- [ ] Tuition: $53,000 - $58,000 USD

#### Stanford (ID: 2)
- [ ] Name: "Stanford University"
- [ ] Location: Stanford, California, USA
- [ ] Ranking: #3
- [ ] Min Score: 1450

#### Oxford (ID: 3)
- [ ] Name: "University of Oxford"
- [ ] Location: Oxford, UK
- [ ] Ranking: #2
- [ ] Specialties: Law, Medicine, Philosophy, History
- [ ] Exams: IB, IELTS

## 6. 404 Error Handling

### Invalid University ID
- [ ] Navigate to `/universities/999`
- [ ] 404 message displays: "University Not Found"
- [ ] "Back to Universities" button is visible
- [ ] Clicking button returns to list
- [ ] No JavaScript errors
- [ ] Page doesn't crash

## 7. Responsive Design Tests

### Mobile (< 600px)
#### List Page
- [ ] Filters stack vertically
- [ ] University cards: 1 column grid
- [ ] Cards are full width
- [ ] All content is readable
- [ ] No horizontal scroll
- [ ] Buttons are touch-friendly

#### Detail Page
- [ ] Logo section stacks vertically
- [ ] Two-column layout becomes single column
- [ ] Right sidebar cards stack below content
- [ ] All text is readable
- [ ] No horizontal scroll

### Tablet (600px - 900px)
- [ ] List: 2 column grid
- [ ] Filters: 2 column grid
- [ ] Detail: Still single column or adjusted
- [ ] Proper spacing maintained

### Desktop (> 1200px)
- [ ] List: 3 column grid
- [ ] Filters: 2 column grid side by side
- [ ] Detail: 2 column layout (8/4 split)
- [ ] Content properly centered in container
- [ ] Maximum width maintained

## 8. Accessibility Tests

### Keyboard Navigation
- [ ] Tab key navigates through all interactive elements
- [ ] Focus indicators are visible
- [ ] Enter key activates buttons and links
- [ ] Arrow keys work in dropdowns
- [ ] Escape closes dropdowns
- [ ] Tab order is logical

### Screen Reader (Optional)
- [ ] Page has proper heading structure
- [ ] Images have alt text
- [ ] Icons have aria-labels
- [ ] Form inputs have labels
- [ ] Links are descriptive
- [ ] Status messages are announced (aria-live)

### Visual Accessibility
- [ ] Text has sufficient contrast
- [ ] Touch targets are at least 44x44px
- [ ] Focus indicators are clear
- [ ] No content only conveyed by color
- [ ] Zoom to 200% still usable

## 9. Performance Tests

### Loading
- [ ] Page loads in < 3 seconds
- [ ] No layout shift on load
- [ ] Images load progressively
- [ ] No blocking resources

### Interaction
- [ ] Filtering is instant (no lag)
- [ ] Hover effects are smooth
- [ ] Navigation is instant
- [ ] No janky animations

### Developer Tools
- [ ] No console errors
- [ ] No console warnings (or expected ones only)
- [ ] Network tab shows reasonable request count
- [ ] React DevTools shows efficient re-renders

## 10. Browser Compatibility (Optional)

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## 11. Edge Cases

### Data Edge Cases
- [ ] University with no logo shows fallback icon
- [ ] University with no ranking shows no badge
- [ ] University with > 3 specialties shows "+N more" chip
- [ ] University with no tuition data doesn't show tuition card

### URL Edge Cases
- [ ] Invalid university ID shows 404
- [ ] Malformed URL handled gracefully
- [ ] Direct navigation to routes works
- [ ] Browser back/forward buttons work

### Filter Edge Cases
- [ ] No filters selected shows all results
- [ ] Single filter works independently
- [ ] Multiple filters work together
- [ ] Clearing all filters resets to full list
- [ ] Filter state doesn't persist on navigation

## 12. Integration Tests

### Full User Journey 1: Filter and View
1. [ ] Start at homepage
2. [ ] Click "Explore Universities"
3. [ ] Verify all 6 universities show
4. [ ] Select country "USA"
5. [ ] Verify 2 universities show
6. [ ] Click on MIT card
7. [ ] Verify detail page loads
8. [ ] Click "Back to Universities"
9. [ ] Verify filters still applied (USA)
10. [ ] Clear filter
11. [ ] Verify all 6 universities show again

### Full User Journey 2: Direct Navigation
1. [ ] Open browser to `/universities/3`
2. [ ] Verify Oxford detail page loads
3. [ ] Click "Visit Website"
4. [ ] Verify external link opens
5. [ ] Close tab and return
6. [ ] Click "Back to Universities"
7. [ ] Verify list page loads with all universities

### Full User Journey 3: Combined Filters
1. [ ] Navigate to `/universities`
2. [ ] Select country "USA"
3. [ ] Verify 2 results
4. [ ] Select specialty "Computer Science"
5. [ ] Verify 2 results (MIT, Stanford)
6. [ ] Change specialty to "Medicine"
7. [ ] Verify 1 result (Stanford)
8. [ ] Clear country filter
9. [ ] Verify 3 results (all Medicine programs)

## Summary Checklist

### Critical Path (Must Pass)
- [ ] Homepage loads
- [ ] Navigate to universities list
- [ ] All 6 universities display
- [ ] Country filter works
- [ ] Specialty filter works
- [ ] Click card navigates to detail
- [ ] Detail page shows all information
- [ ] Back button returns to list
- [ ] No console errors

### Nice to Have (Should Pass)
- [ ] Responsive design works
- [ ] Hover effects work
- [ ] Accessibility features work
- [ ] Performance is good
- [ ] Edge cases handled

### Future Enhancements (Not Required)
- [ ] Search functionality
- [ ] Sorting options
- [ ] Pagination
- [ ] Loading states
- [ ] Error boundaries

## Test Results Log

| Test Category | Status | Issues Found | Notes |
|--------------|--------|--------------|-------|
| Homepage | ⬜ Pass / ⬜ Fail | | |
| List Page | ⬜ Pass / ⬜ Fail | | |
| Filters | ⬜ Pass / ⬜ Fail | | |
| Detail Page | ⬜ Pass / ⬜ Fail | | |
| Navigation | ⬜ Pass / ⬜ Fail | | |
| Responsive | ⬜ Pass / ⬜ Fail | | |
| Accessibility | ⬜ Pass / ⬜ Fail | | |
| Performance | ⬜ Pass / ⬜ Fail | | |

## Bugs Found Template

```
Bug ID: #
Title:
Description:
Steps to Reproduce:
1.
2.
3.

Expected Result:
Actual Result:
Severity: Critical / High / Medium / Low
Browser:
Device:
Screenshot:
```

## Sign-off

- [ ] All critical tests pass
- [ ] All bugs documented
- [ ] Feature ready for demo
- [ ] Documentation is complete

**Tested By:** _______________
**Date:** _______________
**Version:** _______________
