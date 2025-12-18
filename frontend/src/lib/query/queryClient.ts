/**
 * TanStack Query Client Configuration
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1, // Only retry once for failed requests
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnMount: true, // Refetch on component mount
    },
    mutations: {
      retry: 0, // Don't retry mutations
    },
  },
});
