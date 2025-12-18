import { Card, CardContent, Typography, Box } from '@mui/material';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * FeatureCard Component
 *
 * Displays a feature with icon, title, and description
 *
 * @example
 * <FeatureCard
 *   icon="⚡"
 *   title="Fast"
 *   description="Lightning fast performance"
 * />
 *
 * Features:
 * - Hover effect with shadow transition
 * - Responsive layout
 * - Icon display
 *
 * Accessibility:
 * - Proper heading hierarchy
 * - Semantic HTML
 *
 * Performance:
 * - CSS-only animations
 * - Optimized for rendering
 */
export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-300"
      sx={{ height: '100%' }}
    >
      <CardContent>
        <Box className="text-4xl mb-4">{icon}</Box>
        <Typography variant="h5" component="h3" className="mb-2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
