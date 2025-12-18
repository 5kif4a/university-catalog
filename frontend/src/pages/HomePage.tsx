import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from '@tanstack/react-router';
import Navigation from '@/components/Navigation';
import FeatureCard from '@/components/FeatureCard';

/**
 * HomePage Component
 *
 * Main landing page with MUI components and Tailwind utilities
 *
 * @example
 * // Used in router configuration
 * <Route path="/" component={HomePage} />
 */
export default function HomePage() {
  return (
    <Box className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Main Content */}
      <Container maxWidth="lg" className="py-12">
        <Box className="text-center mb-12">
          <Typography
            variant="h2"
            component="h1"
            className="mb-4"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            Welcome to AI Project
          </Typography>
          <Typography variant="h6" color="text.secondary" className="mb-8">
            Modern React app with MUI, TanStack Router, and Tailwind CSS
          </Typography>
          <Box className="flex gap-4 justify-center">
            <Button
              variant="contained"
              size="large"
              className="px-8"
              component={Link}
              to="/universities"
            >
              Explore Universities
            </Button>
            <Button
              variant="outlined"
              size="large"
              className="px-8"
              component={Link}
              to="/about"
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Feature Cards */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// Mock data
const features = [
  {
    icon: '⚡',
    title: 'Fast Development',
    description: 'Built with Vite for lightning-fast HMR and optimized production builds.',
  },
  {
    icon: '🎨',
    title: 'Modern Design',
    description: 'Material UI components with Tailwind utilities for flexible styling.',
  },
  {
    icon: '🧭',
    title: 'Type-Safe Routing',
    description: 'TanStack Router provides fully type-safe navigation and data loading.',
  },
];
