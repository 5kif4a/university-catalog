import { useState, useMemo } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import UniversityCard from './UniversityCard';
import UniversityFilters from './UniversityFilters';
import type { University, UniversityFilters as Filters } from '@/types/university';

/**
 * UniversityList Component
 *
 * Displays a filterable list of universities
 *
 * @param universities - Array of universities to display
 * @param countries - Available countries for filtering
 * @param specialties - Available specialties for filtering
 *
 * @example
 * <UniversityList
 *   universities={mockUniversities}
 *   countries={countries}
 *   specialties={specialties}
 * />
 *
 * Features:
 * - Filter universities by country and specialty
 * - Responsive grid layout
 * - Empty state when no results
 * - Client-side filtering with useMemo
 *
 * Accessibility:
 * - Semantic heading structure
 * - Screen reader announcements for result count
 * - Focus management
 *
 * Performance:
 * - Memoized filtered results
 * - Only re-filters when dependencies change
 * - Efficient grid rendering
 *
 * State Management:
 * - Local state for filters (useState)
 * - Derived state for filtered list (useMemo)
 */

interface UniversityListProps {
  universities: University[];
  countries: string[];
  specialties: string[];
}

export default function UniversityList({
  universities,
  countries,
  specialties,
}: UniversityListProps) {
  const [filters, setFilters] = useState<Filters>({});

  // Filter universities based on active filters
  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      // Filter by country
      if (filters.country && university.country !== filters.country) {
        return false;
      }

      // Filter by specialty
      if (
        filters.specialty &&
        !university.specialties.includes(filters.specialty)
      ) {
        return false;
      }

      return true;
    });
  }, [universities, filters]);

  return (
    <Box>
      {/* Filters Section */}
      <Box className="mb-8 p-6 bg-white rounded-lg shadow-sm">
        <UniversityFilters
          filters={filters}
          onChange={setFilters}
          countries={countries}
          specialties={specialties}
        />
      </Box>

      {/* Results Header */}
      <Box className="mb-6">
        <Typography
          variant="h5"
          component="h2"
          fontWeight={600}
          color="text.primary"
          aria-live="polite"
        >
          {filteredUniversities.length === 0
            ? 'No universities found'
            : `${filteredUniversities.length} ${
                filteredUniversities.length === 1 ? 'University' : 'Universities'
              } Found`}
        </Typography>
        {filteredUniversities.length > 0 && (
          <Typography variant="body2" color="text.secondary" className="mt-1">
            Showing all available universities matching your criteria
          </Typography>
        )}
      </Box>

      {/* University Grid */}
      {filteredUniversities.length > 0 ? (
        <Grid container spacing={3}>
          {filteredUniversities.map((university) => (
            <Grid item xs={12} sm={6} lg={4} key={university.id}>
              <UniversityCard university={university} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Empty State
        <Box className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Typography variant="h6" color="text.secondary" className="mb-2">
            No universities match your filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters to see more results
          </Typography>
        </Box>
      )}
    </Box>
  );
}
