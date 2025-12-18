import { createFileRoute } from '@tanstack/react-router';
import UniversitiesPage from '@/pages/UniversitiesPage';

/**
 * Universities List Route
 *
 * Displays all universities with filtering capabilities
 *
 * Path: /universities
 */
export const Route = createFileRoute('/universities')({
  component: UniversitiesPage,
});
