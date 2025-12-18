/**
 * Type Mappers
 * Functions to map between backend and frontend data structures
 */

import type { University } from '@/types/api';

/**
 * Map university from backend API structure to frontend structure
 * The backend uses specialty_names while we also have specialty IDs
 */
export function mapUniversityFromAPI(backendUniversity: University): University {
  return {
    ...backendUniversity,
    // Ensure all optional fields have defaults
    description: backendUniversity.description || '',
    website: backendUniversity.website || '',
    logo: backendUniversity.logo || undefined,
    ranking: backendUniversity.ranking || undefined,
    tuition_fee_usd: backendUniversity.tuition_fee_usd || undefined,
    student_count: backendUniversity.student_count || undefined,
    acceptance_rate: backendUniversity.acceptance_rate || undefined,
    // specialty_names is already provided by backend
    specialty_names: backendUniversity.specialty_names || [],
    specialties: backendUniversity.specialties || [],
    requirements: backendUniversity.requirements || [],
  };
}

/**
 * Extract unique countries from universities list
 */
export function extractCountries(universities: University[]): string[] {
  const countries = new Set(universities.map(u => u.country).filter(Boolean));
  return Array.from(countries).sort();
}

/**
 * Extract unique specialty names from universities list
 */
export function extractSpecialtyNames(universities: University[]): string[] {
  const specialties = new Set(
    universities.flatMap(u => u.specialty_names || []).filter(Boolean)
  );
  return Array.from(specialties).sort();
}
