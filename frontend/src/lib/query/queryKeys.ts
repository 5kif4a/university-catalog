/**
 * Query Keys Factory
 * Organized and type-safe query keys for TanStack Query
 */

import type { UniversityFilters } from '@/types/api';

export const queryKeys = {
  // Universities
  universities: {
    all: ['universities'] as const,
    lists: () => [...queryKeys.universities.all, 'list'] as const,
    list: (filters: UniversityFilters) => [...queryKeys.universities.lists(), filters] as const,
    details: () => [...queryKeys.universities.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.universities.details(), id] as const,
    search: (query: string) => [...queryKeys.universities.all, 'search', query] as const,
  },

  // Specialties
  specialties: {
    all: ['specialties'] as const,
    list: () => [...queryKeys.specialties.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.specialties.all, 'detail', id] as const,
    search: (query: string) => [...queryKeys.specialties.all, 'search', query] as const,
  },

  // AI
  ai: {
    all: ['ai'] as const,
    recommendations: () => [...queryKeys.ai.all, 'recommendations'] as const,
    comparisons: () => [...queryKeys.ai.all, 'comparisons'] as const,
  },
};
