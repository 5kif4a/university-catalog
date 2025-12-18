import { useState, useMemo } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import UniversityCard from './UniversityCard';
import UniversityFilters from './UniversityFilters';
import type { University, UniversityFilters as Filters } from '@/types/api';

/**
 * UniversityList Component
 *
 * Displays a filterable list of universities with smooth animations
 * Now powered by real API data
 *
 * @param universities - Array of universities from API
 * @param countries - Available countries for filtering
 * @param specialties - Available specialties for filtering
 *
 * @example
 * <UniversityList
 *   universities={universitiesData.items}
 *   countries={countries}
 *   specialties={specialties}
 * />
 *
 * Features:
 * - Filter universities by country and specialty
 * - Stagger animations for grid items using Framer Motion
 * - Responsive grid layout with generous spacing
 * - Apple-style minimalist design
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
 * - GPU-accelerated animations
 */

interface UniversityListProps {
  universities: University[];
  countries: string[];
  specialties: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

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

      // Filter by specialty (check specialty_names from API)
      if (
        filters.specialty &&
        !university.specialty_names.includes(filters.specialty)
      ) {
        return false;
      }

      return true;
    });
  }, [universities, filters]);

  return (
    <Box>
      {/* Filters Section */}
      <Box
        sx={{
          mb: 10,
          p: 4,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <UniversityFilters
          filters={filters}
          onChange={setFilters}
          countries={countries}
          specialties={specialties}
        />
      </Box>

      {/* Results Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 500, mb: 1 }}
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
          <Typography variant="body2" color="text.secondary">
            Showing all available universities matching your criteria
          </Typography>
        )}
      </Box>

      {/* University Grid */}
      {filteredUniversities.length > 0 ? (
        <Grid
          container
          spacing={4}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredUniversities.map((university) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={university.id}
              component={motion.div}
              variants={itemVariants}
            >
              <UniversityCard university={university} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Empty State
        <Box
          sx={{
            textAlign: 'center',
            py: 12,
            px: 4,
            backgroundColor: 'background.paper',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
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
