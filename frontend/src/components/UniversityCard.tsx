import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { School, LocationOn, EmojiEvents } from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { University } from '@/types/api';

/**
 * UniversityCard Component
 *
 * Displays university information in a card format for list view
 * Now with Framer Motion animations and Apple-style design
 *
 * @param university - University data from API
 *
 * @example
 * <UniversityCard university={universityData} />
 *
 * Features:
 * - University logo with fallback icon
 * - Ranking badge (if available)
 * - Specialty chips (max 3 displayed)
 * - Tuition fee display (if available)
 * - Smooth Framer Motion hover animations
 * - Apple-style minimalist design with generous spacing
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
 * - GPU-accelerated animations
 * - Optimized rendering
 */

interface UniversityCardProps {
  university: University;
}

const MotionCard = motion(Card);

export default function UniversityCard({ university }: UniversityCardProps) {
  const navigate = useNavigate();

  // Get minimum score from requirements (if available)
  const minScore =
    university.requirements && university.requirements.length > 0
      ? Math.min(...university.requirements.map((r) => r.minimum_score))
      : null;

  const handleClick = () => {
    navigate({ to: '/universities/$id', params: { id: university._id } });
  };

  return (
    <MotionCard
      onClick={handleClick}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: 4,
        '&:hover': {
          '& .university-logo': {
            transform: 'scale(1.08)',
          },
        },
      }}
    >
      {/* University Logo */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          height: 200,
        }}
      >
        {university.logo ? (
          <CardMedia
            component="img"
            image={university.logo}
            alt={`${university.name} logo`}
            className="university-logo transition-transform duration-300 object-contain"
            sx={{ height: 120, width: 120 }}
            loading="lazy"
          />
        ) : (
          <School
            className="university-logo transition-transform duration-300"
            sx={{ fontSize: 96, color: 'primary.main', opacity: 0.4 }}
            aria-label="University icon"
          />
        )}

        {/* Ranking Badge */}
        {university.ranking && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: '#fff',
              borderRadius: 12,
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
            aria-label={`Ranking: ${university.ranking}`}
          >
            <EmojiEvents sx={{ fontSize: 18, color: '#f59e0b' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              #{university.ranking}
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* University Name */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 2.5,
            fontWeight: 500,
            minHeight: 64,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          color="text.primary"
        >
          {university.name}
        </Typography>

        {/* Location */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <LocationOn sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {university.city}, {university.country}
          </Typography>
        </Stack>

        {/* Specialties */}
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
          {university.specialty_names.slice(0, 3).map((specialty) => (
            <Chip
              key={specialty}
              label={specialty}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'primary.light',
                color: 'primary.main',
                fontSize: '0.75rem',
                fontWeight: 400,
              }}
            />
          ))}
          {university.specialty_names.length > 3 && (
            <Chip
              label={`+${university.specialty_names.length - 3}`}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'divider',
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 400,
              }}
            />
          )}
        </Stack>

        {/* Key Info */}
        <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* Minimum Score */}
            {minScore && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Min. Score
                </Typography>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 500 }}>
                  {minScore}
                </Typography>
              </Box>
            )}

            {/* Tuition Fee */}
            {university.tuition_fee_usd && (
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Tuition
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${(university.tuition_fee_usd / 1000).toFixed(0)}k
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        {/* View Details Button */}
        <Button variant="outlined" fullWidth sx={{ mt: 3, py: 1.25 }}>
          View Details
        </Button>
      </CardContent>
    </MotionCard>
  );
}
