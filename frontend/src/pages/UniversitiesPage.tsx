import { Box, Container, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import UniversityList from '@/components/UniversityList';
import { PageTransition, UniversityListSkeleton, ErrorState } from '@/components';
import { useUniversities } from '@/lib/query/hooks/useUniversities';
import { useSpecialties } from '@/lib/query/hooks/useSpecialties';
import { extractCountries, extractSpecialtyNames } from '@/lib/api/mappers';
import type { UniversityFilters } from '@/types/api';

/**
 * UniversitiesPage Component
 *
 * Main page displaying list of universities with filters
 * Now powered by real API data with TanStack Query
 *
 * Features:
 * - API-powered university list with real-time data
 * - Skeleton loaders during data fetching
 * - Error handling with retry functionality
 * - Responsive layout with Apple-style spacing
 * - Smooth page transitions
 */
export default function UniversitiesPage() {
  const [filters] = useState<UniversityFilters>({});

  // Fetch universities and specialties from API
  const { data: universitiesData, isLoading, error, refetch } = useUniversities(filters);
  const { data: specialtiesData } = useSpecialties();

  // Extract filter options from data
  const countries = useMemo(
    () => (universitiesData?.items ? extractCountries(universitiesData.items) : []),
    [universitiesData]
  );

  const specialtyNames = useMemo(
    () => (specialtiesData ? specialtiesData.map((s) => s.name) : []),
    [specialtiesData]
  );

  return (
    <PageTransition>
      <Box className="min-h-screen" sx={{ backgroundColor: 'background.default' }}>
        <Navigation />

        {/* Page Header */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h1"
              sx={{ mb: 2, fontWeight: 500 }}
            >
              Explore Universities
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px' }}>
              Discover top universities around the world and find the perfect match
              for your academic goals
            </Typography>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          {isLoading ? (
            <UniversityListSkeleton count={6} />
          ) : error ? (
            <ErrorState
              message={(error as any).message || 'Failed to load universities. Please ensure the backend is running.'}
              onRetry={refetch}
            />
          ) : (
            <UniversityList
              universities={universitiesData?.items || []}
              countries={countries}
              specialties={specialtyNames}
            />
          )}
        </Container>
      </Box>
    </PageTransition>
  );
}
