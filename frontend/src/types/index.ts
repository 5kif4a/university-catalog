/**
 * Global TypeScript type definitions
 */

// Re-export all types
export * from './university';

// Example user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Example API response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Example pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
