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
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="h1" className="font-bold flex-1">
          AI Project
        </Typography>
        <Box component="nav" className="flex gap-4">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/universities">
            Universities
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
