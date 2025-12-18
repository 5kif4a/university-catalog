/**
 * University Card Skeleton
 * Loading placeholder for university cards with Apple-style minimalist design
 */

import { Card, CardContent, Skeleton, Box } from '@mui/material';

export function UniversityCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 4, height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Logo/Icon */}
        <Box className="flex justify-center mb-4">
          <Skeleton variant="circular" width={80} height={80} animation="wave" />
        </Box>

        {/* Ranking Badge */}
        <Box className="flex justify-center mb-3">
          <Skeleton variant="rounded" width={80} height={24} animation="wave" sx={{ borderRadius: 3 }} />
        </Box>

        {/* University Name */}
        <Skeleton variant="text" height={32} animation="wave" sx={{ mb: 1 }} />

        {/* Location */}
        <Skeleton variant="text" width="70%" height={24} animation="wave" sx={{ mb: 3 }} />

        {/* Specialty Chips */}
        <Box className="flex gap-2 flex-wrap mb-4">
          <Skeleton variant="rounded" width={100} height={32} animation="wave" sx={{ borderRadius: 4 }} />
          <Skeleton variant="rounded" width={120} height={32} animation="wave" sx={{ borderRadius: 4 }} />
          <Skeleton variant="rounded" width={90} height={32} animation="wave" sx={{ borderRadius: 4 }} />
        </Box>

        {/* Minimum Score */}
        <Skeleton variant="text" width="50%" height={24} animation="wave" sx={{ mb: 2 }} />

        {/* Button */}
        <Skeleton variant="rounded" height={40} animation="wave" sx={{ borderRadius: 2 }} />
      </CardContent>
    </Card>
  );
}
