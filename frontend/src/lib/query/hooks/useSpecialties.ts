/**
 * useSpecialties Hook
 * Fetch all specialties
 */

import { useQuery } from '@tanstack/react-query';
import { getSpecialties } from '@/lib/api/specialties';
import { queryKeys } from '../queryKeys';

export function useSpecialties() {
  return useQuery({
    queryKey: queryKeys.specialties.list(),
    queryFn: () => getSpecialties(),
    staleTime: 10 * 60 * 1000, // 10 minutes (specialties change rarely)
  });
}
