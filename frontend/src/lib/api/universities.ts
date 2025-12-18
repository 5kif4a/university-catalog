/**
 * Universities API Service
 * API calls for university-related operations
 */

import apiClient from './client';
import type { University, PaginatedResponse, UniversityFilters } from '@/types/api';

/**
 * Get paginated list of universities with optional filters
 */
export async function getUniversities(
  filters: UniversityFilters = {}
): Promise<PaginatedResponse<University>> {
  const { data } = await apiClient.get<PaginatedResponse<University>>('/universities/', {
    params: filters,
  });
  return data;
}

/**
 * Get a single university by ID
 */
export async function getUniversity(id: string): Promise<University> {
  const { data } = await apiClient.get<University>(`/universities/${id}`);
  return data;
}

/**
 * Search universities by query
 */
export async function searchUniversities(query: string): Promise<University[]> {
  const { data } = await apiClient.get<University[]>('/universities/search', {
    params: { query },
  });
  return data;
}

/**
 * Create a new university
 */
export async function createUniversity(university: Partial<University>): Promise<University> {
  const { data } = await apiClient.post<University>('/universities/', university);
  return data;
}

/**
 * Update an existing university
 */
export async function updateUniversity(id: string, university: Partial<University>): Promise<University> {
  const { data } = await apiClient.put<University>(`/universities/${id}`, university);
  return data;
}

/**
 * Delete a university
 */
export async function deleteUniversity(id: string): Promise<void> {
  await apiClient.delete(`/universities/${id}`);
}
