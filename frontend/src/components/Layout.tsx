import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import Navigation from './Navigation';
import { PageTransition } from './PageTransition';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 *
 * Main layout wrapper with navigation and content area
 * Now with Apple-style minimalist design and smooth transitions
 *
 * @example
 * <Layout>
 *   <YourContent />
 * </Layout>
 *
 * Features:
 * - Responsive container with generous spacing
 * - Reusable navigation component
 * - Smooth page transitions with Framer Motion
 * - Pure white background for minimalist design
 * - Apple-style spacing and padding
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Keyboard navigation support
 *
 * Performance:
 * - GPU-accelerated animations
 * - Optimized rendering
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <Box className="min-h-screen" sx={{ backgroundColor: 'background.default' }}>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <PageTransition>{children}</PageTransition>
      </Container>
    </Box>
  );
}
