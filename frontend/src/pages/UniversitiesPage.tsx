import { Box, Container, Typography } from '@mui/material';
import Navigation from '@/components/Navigation';
import UniversityList from '@/components/UniversityList';
import { mockUniversities, countries, specialties } from '@/mock/universities';

/**
 * UniversitiesPage Component
 *
 * Main page displaying list of universities with filters
 *
 * @example
 * // Used in router configuration
 * <Route path="/universities" component={UniversitiesPage} />
 *
 * Features:
 * - Full university list with filtering
 * - Responsive layout
 * - Navigation header
 * - Mock data for demonstration
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy (h1, h2)
 * - Focus management
 * - ARIA labels
 *
 * Performance:
 * - Static data (no API calls)
 * - Efficient filtering in child component
 * - Memoized university list
 */
export default function UniversitiesPage() {
  return (
    <Box className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Page Header */}
      <Box className="bg-white border-b border-slate-200 shadow-sm">
        <Container maxWidth="lg" className="py-8">
          <Typography
            variant="h3"
            component="h1"
            className="mb-2"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            Explore Universities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover top universities around the world and find the perfect match
            for your academic goals
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" className="py-8">
        <UniversityList
          universities={mockUniversities}
          countries={countries}
          specialties={specialties}
        />
      </Container>
    </Box>
  );
}
