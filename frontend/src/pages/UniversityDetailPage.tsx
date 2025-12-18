import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Language,
  EmojiEvents,
  School,
  Assignment,
  AttachMoney,
  CheckCircle,
  People,
  TrendingUp,
} from '@mui/icons-material';
import { Link, useParams } from '@tanstack/react-router';
import Navigation from '@/components/Navigation';
import { PageTransition, UniversityDetailSkeleton, ErrorState } from '@/components';
import { useUniversityDetail } from '@/lib/query/hooks/useUniversityDetail';

/**
 * UniversityDetailPage Component
 *
 * Detailed view of a single university with all information
 * Now powered by real API data with TanStack Query
 *
 * Features:
 * - API-powered university details with real-time data
 * - Skeleton loaders during data fetching
 * - Error handling with retry functionality
 * - Apple-style minimalist design with generous spacing
 * - Smooth page transitions
 * - Requirements breakdown by specialty
 * - Responsive layout with grid
 */
export default function UniversityDetailPage() {
  const { id } = useParams({ from: '/universities/$id' });
  const { data: university, isLoading, error, refetch } = useUniversityDetail(id);

  // Loading state
  if (isLoading) {
    return (
      <Box className="min-h-screen" sx={{ backgroundColor: 'background.default' }}>
        <Navigation />
        <UniversityDetailSkeleton />
      </Box>
    );
  }

  // Error state
  if (error || !university) {
    return (
      <Box className="min-h-screen" sx={{ backgroundColor: 'background.default' }}>
        <Navigation />
        <ErrorState
          message={
            (error as any)?.message ||
            'University not found. Please ensure the backend is running.'
          }
          onRetry={refetch}
        />
      </Box>
    );
  }

  return (
    <PageTransition>
      <Box className="min-h-screen" sx={{ backgroundColor: 'background.default' }}>
        <Navigation />

        {/* Hero Section */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Button
              component={Link}
              to="/universities"
              sx={{ mb: 4 }}
              startIcon={<span>&larr;</span>}
            >
              Back to Universities
            </Button>

            <Box className="flex flex-col md:flex-row gap-8 items-start">
              {/* University Logo */}
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 4,
                  p: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 180,
                  height: 180,
                }}
              >
                {university.logo ? (
                  <img
                    src={university.logo}
                    alt={`${university.name} logo`}
                    className="max-h-36 max-w-[160px] object-contain"
                    loading="lazy"
                  />
                ) : (
                  <School sx={{ fontSize: 96, color: 'primary.main', opacity: 0.6 }} />
                )}
              </Box>

              {/* University Header Info */}
              <Box className="flex-1">
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{ mb: 3, fontWeight: 500 }}
                >
                  {university.name}
                </Typography>

                <Box className="flex flex-wrap gap-4 mb-5">
                  {/* Location */}
                  <Box className="flex items-center gap-1.5">
                    <LocationOn sx={{ fontSize: 22, color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.secondary">
                      {university.city}, {university.country}
                    </Typography>
                  </Box>

                  {/* Ranking */}
                  {university.ranking && (
                    <Box className="flex items-center gap-1.5">
                      <EmojiEvents sx={{ fontSize: 22, color: '#f59e0b' }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Ranked #{university.ranking}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Website Link */}
                {university.website && (
                  <Button
                    variant="outlined"
                    startIcon={<Language />}
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mb: 5 }}
                  >
                    Visit Website
                  </Button>
                )}

                {/* Specialties */}
                <Box className="flex flex-wrap gap-2">
                  {university.specialty_names.map((specialty) => (
                    <Chip key={specialty} label={specialty} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={5}>
            {/* Left Column - Description and Requirements */}
            <Grid item xs={12} md={8}>
              {/* About Section */}
              <Card sx={{ mb: 5, borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
                    About
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {university.description || 'No description available.'}
                  </Typography>
                </CardContent>
              </Card>

              {/* Requirements by Specialty */}
              {university.requirements && university.requirements.length > 0 && (
                <Card sx={{ borderRadius: 4 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box className="flex items-center gap-2 mb-4">
                      <Assignment color="primary" />
                      <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        Requirements by Specialty
                      </Typography>
                    </Box>
                    <Box className="space-y-4">
                      {university.requirements.map((req) => (
                        <Paper
                          key={req.specialty_id}
                          elevation={0}
                          sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 3,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 500 }}
                            color="primary"
                          >
                            {req.specialty_name}
                          </Typography>

                          <Box className="space-y-2">
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontWeight: 500, mb: 0.5 }}
                              >
                                Minimum Score
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {req.minimum_score}
                              </Typography>
                            </Box>

                            {req.exams && req.exams.length > 0 && (
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontWeight: 500, mb: 1 }}
                                >
                                  Required Exams
                                </Typography>
                                <Box className="flex flex-wrap gap-2">
                                  {req.exams.map((exam) => (
                                    <Chip
                                      key={exam}
                                      label={exam}
                                      size="small"
                                      icon={<CheckCircle />}
                                      sx={{ fontWeight: 400 }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )}

                            {req.additional_requirements && (
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontWeight: 500, mb: 0.5 }}
                                >
                                  Additional Requirements
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {req.additional_requirements}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Right Column - Key Statistics */}
            <Grid item xs={12} md={4}>
              {/* Tuition Fees */}
              {university.tuition_fee_usd && (
                <Card sx={{ mb: 4, borderRadius: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box className="flex items-center gap-2 mb-3">
                      <AttachMoney color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Annual Tuition
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Estimated Annual Cost
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                      ${university.tuition_fee_usd.toLocaleString()} USD
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Student Count */}
              {university.student_count && (
                <Card sx={{ mb: 4, borderRadius: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box className="flex items-center gap-2 mb-3">
                      <People color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Student Body
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Total Students
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                      {university.student_count.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Acceptance Rate */}
              {university.acceptance_rate && (
                <Card sx={{ mb: 4, borderRadius: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box className="flex items-center gap-2 mb-3">
                      <TrendingUp color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Acceptance Rate
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Admission Rate
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                      {(university.acceptance_rate * 100).toFixed(1)}%
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Apply Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<School />}
                sx={{ py: 1.5 }}
              >
                Apply Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PageTransition>
  );
}
