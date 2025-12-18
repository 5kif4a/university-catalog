import { createTheme } from '@mui/material/styles';

// Modern minimalist theme without gradients
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Blue - use sparingly
      light: '#3b82f6',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b', // Slate
      light: '#94a3b8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#ffffff', // Pure white for Apple-style
      paper: '#ffffff',
    },
    text: {
      primary: '#000000', // Near black for maximum contrast
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
    divider: 'rgba(0, 0, 0, 0.06)', // Very subtle divider
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600, // Lighter weight for Apple-style
      letterSpacing: '-0.02em',
      lineHeight: 1.3, // Increased line-height
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600, // Reduced from 700
      letterSpacing: '-0.01em',
      lineHeight: 1.4, // Increased
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500, // Reduced from 600
      letterSpacing: '-0.005em', // Slightly increased spacing
      lineHeight: 1.5, // Increased
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500, // Reduced
      lineHeight: 1.5, // Increased
      letterSpacing: '0em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500, // Reduced
      lineHeight: 1.6, // Increased
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500, // Reduced
      lineHeight: 1.6, // Increased
      letterSpacing: '0.005em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7, // Increased for better readability
      letterSpacing: '0.005em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7, // Increased
      letterSpacing: '0.005em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 400, // Reduced from 500
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.02)', // Much lighter shadows for Apple-style
    '0 1px 3px rgba(0, 0, 0, 0.04)',
    '0 2px 4px rgba(0, 0, 0, 0.04)',
    '0 4px 8px rgba(0, 0, 0, 0.06)',
    '0 8px 16px rgba(0, 0, 0, 0.08)',
    '0 12px 24px rgba(0, 0, 0, 0.1)',
    '0 16px 32px rgba(0, 0, 0, 0.12)',
    '0 20px 40px rgba(0, 0, 0, 0.14)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 48px rgba(0, 0, 0, 0.16)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded for Apple-style
          padding: '12px 24px', // More padding
          fontSize: '0.9375rem', // Slightly larger
          fontWeight: 400, // Lighter weight
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', // Lighter shadow
          },
        },
        outlined: {
          borderWidth: '1px', // Thinner border
          borderColor: 'rgba(0, 0, 0, 0.12)',
          '&:hover': {
            borderWidth: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // More rounded
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)', // Much lighter
          border: '1px solid rgba(0, 0, 0, 0.06)', // Subtle border
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded
        },
        elevation1: {
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)', // Much lighter
        },
        elevation2: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        },
        elevation3: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12, // More rounded
            '& fieldset': {
              borderWidth: '1px', // Thinner border
              borderColor: 'rgba(0, 0, 0, 0.12)', // Lighter border
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1.5px', // Slightly thicker on focus
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // No shadow for cleaner look
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)', // Subtle border instead
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8, // More rounded
          fontWeight: 400, // Lighter weight
        },
      },
    },
  },
});
