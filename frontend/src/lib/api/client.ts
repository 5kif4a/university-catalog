/**
 * API Client
 * Axios instance with interceptors for error handling and toast notifications
 */

import axios, { AxiosError } from 'axios';
import type { ApiError } from '@/types/api';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

/**
 * Axios instance configured for backend API
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Transform axios error to ApiError
 */
export function transformError(error: AxiosError): ApiError {
  if (error.response) {
    // Server responded with error status
    const data = error.response.data as any;
    return {
      message: data?.message || data?.detail || 'An error occurred',
      detail: data?.detail,
      status: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response received
    return {
      message: 'Network error. Please check your connection and ensure the backend is running.',
      detail: 'No response from server',
      status: 0,
    };
  } else {
    // Error in request configuration
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
}

/**
 * Response interceptor for error handling
 * Note: Toast notifications will be added in a separate module
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError = transformError(error);

    // Log error for debugging
    console.error('API Error:', apiError);

    return Promise.reject(apiError);
  }
);

export default apiClient;
