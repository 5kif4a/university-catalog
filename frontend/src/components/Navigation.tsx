import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from '@tanstack/react-router';

/**
 * Navigation Component
 *
 * Reusable navigation bar for all pages
 *
 * @example
 * <Navigation />
 *
 * Features:
 * - Type-safe routing with TanStack Router
 * - Responsive layout
 * - Material UI styling
 *
 * Accessibility:
 * - Semantic nav element
 * - Keyboard navigation support
 */
export default function Navigation() {
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ backgroundColor: '#fff' }}>
      <Toolbar sx={{ py: 2, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h6"
          component="h1"
          className="flex-1"
          sx={{ fontWeight: 500, color: 'text.primary' }}
        >
          University Catalog
        </Typography>
        <Box component="nav" className="flex gap-6">
          <Button
            component={Link}
            to="/"
            sx={{
              color: 'text.primary',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/universities"
            sx={{
              color: 'text.primary',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            }}
          >
            Universities
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{
              color: 'text.primary',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            }}
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
