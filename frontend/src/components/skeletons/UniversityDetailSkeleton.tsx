/**
 * University Detail Skeleton
 * Loading placeholder for university detail page
 */

import { Container, Box, Skeleton, Card, CardContent, Grid } from '@mui/material';

export function UniversityDetailSkeleton() {
  return (
    <Container maxWidth="lg" className="py-12">
      {/* Back Button */}
      <Box className="mb-6">
        <Skeleton variant="rounded" width={180} height={40} animation="wave" sx={{ borderRadius: 2 }} />
      </Box>

      {/* Hero Section */}
      <Card sx={{ mb: 6, borderRadius: 4, p: 4 }}>
        <Box className="flex flex-col md:flex-row gap-6 items-start">
          {/* Logo */}
          <Skeleton variant="circular" width={120} height={120} animation="wave" />

          {/* Info */}
          <Box className="flex-1">
            {/* University Name */}
            <Skeleton variant="text" height={48} width="80%" animation="wave" sx={{ mb: 2 }} />

            {/* Location & Ranking */}
            <Box className="flex gap-4 mb-3">
              <Skeleton variant="text" width={200} height={28} animation="wave" />
              <Skeleton variant="text" width={100} height={28} animation="wave" />
            </Box>

            {/* Website Button */}
            <Skeleton variant="rounded" width={150} height={40} animation="wave" sx={{ borderRadius: 2, mb: 3 }} />

            {/* Specialty Chips */}
            <Box className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rounded" width={120} height={32} animation="wave" sx={{ borderRadius: 4 }} />
              ))}
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Content Grid */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* About Section */}
          <Card sx={{ mb: 4, borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Skeleton variant="text" height={36} width="30%" animation="wave" sx={{ mb: 2 }} />
              <Skeleton variant="text" animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="text" animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" animation="wave" />
            </CardContent>
          </Card>

          {/* Exams Section */}
          <Card sx={{ mb: 4, borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Skeleton variant="text" height={36} width="40%" animation="wave" sx={{ mb: 2 }} />
              <Box className="space-y-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} variant="rounded" height={80} animation="wave" sx={{ borderRadius: 3 }} />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Skeleton variant="text" height={36} width="45%" animation="wave" sx={{ mb: 2 }} />
              <Box className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} variant="text" height={28} animation="wave" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Score Requirements */}
          <Card sx={{ mb: 4, borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Skeleton variant="text" height={32} width="70%" animation="wave" sx={{ mb: 3 }} />
              <Skeleton variant="text" height={24} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={40} width="50%" animation="wave" sx={{ mb: 3 }} />
              <Skeleton variant="text" height={24} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={40} width="50%" animation="wave" />
            </CardContent>
          </Card>

          {/* Deadline */}
          <Card sx={{ mb: 4, borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Skeleton variant="text" height={32} width="80%" animation="wave" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={28} width="60%" animation="wave" />
            </CardContent>
          </Card>

          {/* Tuition */}
          <Card sx={{ mb: 4, borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Skeleton variant="text" height={32} width="70%" animation="wave" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={28} width="80%" animation="wave" />
            </CardContent>
          </Card>

          {/* Apply Button */}
          <Skeleton variant="rounded" height={48} animation="wave" sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    </Container>
  );
}
