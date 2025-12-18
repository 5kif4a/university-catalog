import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { School, LocationOn, EmojiEvents } from '@mui/icons-material';
import type { University } from '@/types/university';

/**
 * UniversityCard Component
 *
 * Displays university information in a card format for list view
 *
 * @param university - University data to display
 *
 * @example
 * <UniversityCard university={universityData} />
 *
 * Features:
 * - University logo with fallback icon
 * - Country and ranking badges
 * - Specialty chips (max 3 displayed)
 * - Minimum score requirement
 * - Hover effect with scale transform
 * - Responsive layout
 *
 * Accessibility:
 * - Semantic card structure
 * - Alt text for images
 * - ARIA labels for icons
 * - Keyboard navigation support
 *
 * Performance:
 * - Lazy loading for images
 * - CSS transforms for smooth animations
 */

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card
      className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      component={Link}
      to="/universities/$id"
      params={{ id: university.id }}
      sx={{
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
          '& .university-logo': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* University Logo */}
      <Box className="relative bg-slate-50 flex items-center justify-center h-48 overflow-hidden">
        {university.logo ? (
          <CardMedia
            component="img"
            image={university.logo}
            alt={`${university.name} logo`}
            className="university-logo transition-transform duration-300 object-contain h-32 w-32"
            loading="lazy"
          />
        ) : (
          <School
            className="university-logo transition-transform duration-300"
            sx={{ fontSize: 80, color: 'primary.main' }}
            aria-label="University icon"
          />
        )}

        {/* Ranking Badge */}
        {university.ranking && (
          <Box
            className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md"
            aria-label={`Ranking: ${university.ranking}`}
          >
            <EmojiEvents sx={{ fontSize: 18, color: '#f59e0b' }} />
            <Typography variant="body2" fontWeight={600}>
              #{university.ranking}
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent className="flex-1 flex flex-col">
        {/* University Name */}
        <Typography
          variant="h6"
          component="h3"
          className="mb-2 line-clamp-2"
          fontWeight={600}
          color="text.primary"
        >
          {university.name}
        </Typography>

        {/* Location */}
        <Box className="flex items-center gap-1 mb-3">
          <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {university.city}, {university.country}
          </Typography>
        </Box>

        {/* Specialties */}
        <Box className="flex flex-wrap gap-1 mb-3">
          {university.specialties.slice(0, 3).map((specialty) => (
            <Chip
              key={specialty}
              label={specialty}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'primary.light',
                color: 'primary.main',
                fontSize: '0.75rem',
              }}
            />
          ))}
          {university.specialties.length > 3 && (
            <Chip
              label={`+${university.specialties.length - 3}`}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'text.disabled',
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>

        {/* Requirements */}
        <Box className="mt-auto pt-3 border-t border-slate-200">
          <Typography variant="body2" color="text.secondary" className="mb-2">
            Minimum Score
          </Typography>
          <Typography variant="h6" color="primary.main" fontWeight={600}>
            {university.requirements.minScore}
          </Typography>
        </Box>

        {/* View Details Button */}
        <Button
          variant="outlined"
          fullWidth
          className="mt-4"
          sx={{ borderRadius: 2 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
