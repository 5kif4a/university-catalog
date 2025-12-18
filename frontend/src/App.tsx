import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@/theme/theme'
import { queryClient } from '@/lib/query/queryClient'
import { Toaster } from '@/lib/notifications/toast'

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
 * - TanStack Query for data fetching and caching
 * - MUI ThemeProvider with custom theme
 * - TanStack Router for navigation
 * - CssBaseline for consistent styling
 * - Toast notifications
 *
 * @example
 * // Used in main.tsx
 * <App />
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App
