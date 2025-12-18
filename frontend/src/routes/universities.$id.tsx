import { createFileRoute } from '@tanstack/react-router';
import UniversityDetailPage from '@/pages/UniversityDetailPage';

/**
 * University Detail Route
 *
 * Displays detailed information about a specific university
 *
 * Path: /universities/$id
 * Dynamic parameter: id - University identifier
 */
export const Route = createFileRoute('/universities/$id')({
  component: UniversityDetailPage,
});
