import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import type { UniversityFilters as Filters } from '@/types/university';

/**
 * UniversityFilters Component
 *
 * Filter controls for university list
 *
 * @param filters - Current filter values
 * @param onChange - Callback when filters change
 * @param countries - Available countries
 * @param specialties - Available specialties
 *
 * @example
 * <UniversityFilters
 *   filters={filters}
 *   onChange={setFilters}
 *   countries={['USA', 'UK']}
 *   specialties={['Computer Science', 'Engineering']}
 * />
 *
 * Features:
 * - Country filter dropdown
 * - Specialty filter dropdown
 * - Active filter chips
 * - Clear individual filters
 * - Responsive layout
 *
 * Accessibility:
 * - Form labels for screen readers
 * - Keyboard navigation
 * - ARIA attributes on selects
 * - Clear button states
 *
 * State Management:
 * - Controlled components
 * - Parent manages filter state
 */

interface UniversityFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  countries: string[];
  specialties: string[];
}

export default function UniversityFilters({
  filters,
  onChange,
  countries,
  specialties,
}: UniversityFiltersProps) {
  const handleCountryChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    onChange({
      ...filters,
      country: value || undefined,
    });
  };

  const handleSpecialtyChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    onChange({
      ...filters,
      specialty: value || undefined,
    });
  };

  const handleClearCountry = () => {
    onChange({
      ...filters,
      country: undefined,
    });
  };

  const handleClearSpecialty = () => {
    onChange({
      ...filters,
      specialty: undefined,
    });
  };

  const hasActiveFilters = filters.country || filters.specialty;

  return (
    <Stack spacing={4}>
      {/* Filter Header */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <FilterList color="primary" />
        <Box className="text-lg font-semibold text-slate-900">Filters</Box>
      </Stack>

      {/* Filter Controls */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
      >
        {/* Country Filter */}
        <FormControl fullWidth size="medium">
          <InputLabel id="country-filter-label">Country</InputLabel>
          <Select
            labelId="country-filter-label"
            id="country-filter"
            value={filters.country || ''}
            label="Country"
            onChange={handleCountryChange}
            aria-label="Filter by country"
          >
            <MenuItem value="">
              <em>All Countries</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Specialty Filter */}
        <FormControl fullWidth size="medium">
          <InputLabel id="specialty-filter-label">Specialty</InputLabel>
          <Select
            labelId="specialty-filter-label"
            id="specialty-filter"
            value={filters.specialty || ''}
            label="Specialty"
            onChange={handleSpecialtyChange}
            aria-label="Filter by specialty"
          >
            <MenuItem value="">
              <em>All Specialties</em>
            </MenuItem>
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Stack direction="row" flexWrap="wrap" spacing={1} gap={1}>
          {filters.country && (
            <Chip
              label={`Country: ${filters.country}`}
              onDelete={handleClearCountry}
              color="primary"
              variant="filled"
              size="medium"
            />
          )}
          {filters.specialty && (
            <Chip
              label={`Specialty: ${filters.specialty}`}
              onDelete={handleClearSpecialty}
              color="primary"
              variant="filled"
              size="medium"
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
