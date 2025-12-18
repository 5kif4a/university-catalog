import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@/theme/theme'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

/**
 * App Component
 *
 * Root application component that provides:
 * - MUI ThemeProvider with custom theme
 * - TanStack Router for navigation
 * - CssBaseline for consistent styling
 *
 * @example
 * // Used in main.tsx
 * <App />
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
