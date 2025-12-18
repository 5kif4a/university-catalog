/**
 * useUniversityDetail Hook
 * Fetch a single university by ID
 */

import { useQuery } from '@tanstack/react-query';
import { getUniversity } from '@/lib/api/universities';
import { queryKeys } from '../queryKeys';

export function useUniversityDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.universities.detail(id),
    queryFn: () => getUniversity(id),
    enabled: !!id, // Only fetch if id exists
  });
}
