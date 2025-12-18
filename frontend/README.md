# University Catalog Frontend

Modern React application built with the latest technologies.

## Tech Stack

- **React 19** - Latest version with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TanStack Router** - Type-safe routing
- **Material UI v7** - Modern component library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Yarn** - Package manager

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── routes/         # TanStack Router route definitions
│   ├── types/          # TypeScript type definitions
│   ├── mock/           # Mock data for development
│   ├── theme/          # MUI theme configuration
│   ├── App.tsx         # Root application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles with Tailwind
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install
```

### Development

```bash
# Start development server
yarn dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

## Features

- Modern minimalist design without gradients
- Fully type-safe routing with TanStack Router
- Responsive layout with Tailwind utilities
- Material UI components with custom theme
- Hot Module Replacement (HMR) for fast development
- Path aliases (@/ for src/)

## Development Notes

### TanStack Router

Routes are defined in `src/routes/` directory. The router plugin automatically generates the route tree.

### Styling

- Use MUI components for consistent UI
- Use Tailwind utility classes for custom styling
- Tailwind is configured to work alongside MUI (preflight disabled)

### Type Safety

- All routes are fully type-safe
- Use TypeScript for all new components
- Types are defined in `src/types/`

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## Next Steps

- [ ] Add TanStack Query for API calls
- [ ] Add authentication
- [ ] Add more pages and components
- [ ] Add unit tests
- [ ] Add E2E tests
