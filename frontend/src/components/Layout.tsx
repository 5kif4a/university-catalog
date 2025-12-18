import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 *
 * Main layout wrapper with navigation and content area
 *
 * @example
 * <Layout>
 *   <YourContent />
 * </Layout>
 *
 * Features:
 * - Responsive container
 * - Reusable navigation component
 * - Flexible content area
 * - Accessibility: semantic HTML structure
 *
 * Performance:
 * - Optimized for fast rendering
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <Box className="min-h-screen bg-slate-50">
      <Navigation />
      <Container maxWidth="lg" className="py-8">
        {children}
      </Container>
    </Box>
  );
}
