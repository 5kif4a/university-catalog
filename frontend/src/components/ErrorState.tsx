/**
 * Error State Component
 * Displays error messages with retry functionality
 */

import { Box, Typography, Button, Container } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'An error occurred', onRetry }: ErrorStateProps) {
  return (
    <Container maxWidth="md">
      <Box
        className="flex flex-col items-center justify-center text-center"
        sx={{ py: 12 }}
      >
        <ErrorOutline
          sx={{
            fontSize: 64,
            color: 'error.main',
            mb: 3,
            opacity: 0.5,
          }}
        />

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
          Something went wrong
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
          {message}
        </Typography>

        <Box className="flex gap-3">
          {onRetry && (
            <Button variant="contained" onClick={onRetry} size="large">
              Try Again
            </Button>
          )}

          <Button component={Link} to="/" variant="outlined" size="large">
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
