/**
 * useUniversities Hook
 * Fetch paginated list of universities with filters
 */

import { useQuery } from '@tanstack/react-query';
import { getUniversities } from '@/lib/api/universities';
import { queryKeys } from '../queryKeys';
import type { UniversityFilters } from '@/types/api';

export function useUniversities(filters: UniversityFilters = {}) {
  return useQuery({
    queryKey: queryKeys.universities.list(filters),
    queryFn: () => getUniversities(filters),
  });
}
