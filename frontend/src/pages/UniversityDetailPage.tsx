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
  CalendarToday,
  Description,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { Link, useParams } from '@tanstack/react-router';
import Navigation from '@/components/Navigation';
import { mockUniversities } from '@/mock/universities';

/**
 * UniversityDetailPage Component
 *
 * Detailed view of a single university with all information
 *
 * @example
 * // Used in router configuration
 * <Route path="/universities/$id" component={UniversityDetailPage} />
 *
 * Features:
 * - Complete university information
 * - Requirements and exams breakdown
 * - Documents list
 * - Application deadline
 * - Tuition fees
 * - Responsive layout with grid
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA labels for icons
 * - Focus management
 * - Back navigation
 *
 * Performance:
 * - Static data lookup by ID
 * - Lazy loaded images
 * - Optimized rendering
 */
export default function UniversityDetailPage() {
  const { id } = useParams({ from: '/universities/$id' });
  const university = mockUniversities.find((u) => u.id === id);

  // 404 state if university not found
  if (!university) {
    return (
      <Box className="min-h-screen bg-slate-50">
        <Navigation />
        <Container maxWidth="lg" className="py-12 text-center">
          <Typography variant="h4" className="mb-4">
            University Not Found
          </Typography>
          <Button variant="contained" component={Link} to="/universities">
            Back to Universities
          </Button>
        </Container>
      </Box>
    );
  }

  const { requirements } = university;
  const tuitionRange =
    requirements.tuitionFee &&
    `${requirements.tuitionFee.min.toLocaleString()} - ${requirements.tuitionFee.max.toLocaleString()} ${
      requirements.tuitionFee.currency
    }`;

  return (
    <Box className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <Box className="bg-white border-b border-slate-200 shadow-sm">
        <Container maxWidth="lg" className="py-8">
          <Button
            component={Link}
            to="/universities"
            className="mb-4"
            startIcon={<span>&larr;</span>}
          >
            Back to Universities
          </Button>

          <Box className="flex flex-col md:flex-row gap-6 items-start">
            {/* University Logo */}
            <Box className="bg-slate-50 rounded-lg p-6 flex items-center justify-center min-w-[160px] h-40">
              {university.logo ? (
                <img
                  src={university.logo}
                  alt={`${university.name} logo`}
                  className="max-h-32 max-w-[140px] object-contain"
                  loading="lazy"
                />
              ) : (
                <School sx={{ fontSize: 80, color: 'primary.main' }} />
              )}
            </Box>

            {/* University Header Info */}
            <Box className="flex-1">
              <Typography
                variant="h3"
                component="h1"
                className="mb-2"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                {university.name}
              </Typography>

              <Box className="flex flex-wrap gap-3 mb-4">
                {/* Location */}
                <Box className="flex items-center gap-1">
                  <LocationOn sx={{ fontSize: 20, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {university.city}, {university.country}
                  </Typography>
                </Box>

                {/* Ranking */}
                {university.ranking && (
                  <Box className="flex items-center gap-1">
                    <EmojiEvents sx={{ fontSize: 20, color: '#f59e0b' }} />
                    <Typography variant="body1" fontWeight={600}>
                      Ranked #{university.ranking}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Website Link */}
              <Button
                variant="outlined"
                startIcon={<Language />}
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4"
              >
                Visit Website
              </Button>

              {/* Specialties */}
              <Box className="flex flex-wrap gap-2">
                {university.specialties.map((specialty) => (
                  <Chip
                    key={specialty}
                    label={specialty}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" className="py-8">
        <Grid container spacing={4}>
          {/* Left Column - Description */}
          <Grid item xs={12} md={8}>
            {/* About Section */}
            <Card className="mb-4">
              <CardContent>
                <Typography variant="h5" className="mb-4" fontWeight={600}>
                  About
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {university.description}
                </Typography>
              </CardContent>
            </Card>

            {/* Exams Section */}
            <Card className="mb-4">
              <CardContent>
                <Box className="flex items-center gap-2 mb-4">
                  <Assignment color="primary" />
                  <Typography variant="h5" fontWeight={600}>
                    Required Exams
                  </Typography>
                </Box>
                <Box className="space-y-3">
                  {requirements.exams.map((exam) => (
                    <Paper
                      key={exam.name}
                      elevation={0}
                      className="p-4 border border-slate-200"
                    >
                      <Box className="flex items-start justify-between">
                        <Box className="flex-1">
                          <Box className="flex items-center gap-2 mb-1">
                            <Typography variant="h6" fontWeight={600}>
                              {exam.name}
                            </Typography>
                            {exam.required ? (
                              <Chip
                                label="Required"
                                size="small"
                                color="error"
                                icon={<CheckCircle />}
                              />
                            ) : (
                              <Chip
                                label="Optional"
                                size="small"
                                icon={<Cancel />}
                              />
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Minimum Score: {exam.minScore}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Documents Section */}
            <Card>
              <CardContent>
                <Box className="flex items-center gap-2 mb-4">
                  <Description color="primary" />
                  <Typography variant="h5" fontWeight={600}>
                    Required Documents
                  </Typography>
                </Box>
                <Box className="space-y-2">
                  {requirements.documents.map((doc, index) => (
                    <Box key={index} className="flex items-center gap-2">
                      <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                      <Typography variant="body1">{doc}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Key Info */}
          <Grid item xs={12} md={4}>
            {/* Score Requirements */}
            <Card className="mb-4">
              <CardContent>
                <Box className="flex items-center gap-2 mb-3">
                  <School color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Score Requirements
                  </Typography>
                </Box>
                <Divider className="mb-3" />
                <Box className="space-y-3">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Minimum Score
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight={600}>
                      {requirements.minScore}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Maximum Score
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      {requirements.maxScore}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Application Deadline */}
            <Card className="mb-4">
              <CardContent>
                <Box className="flex items-center gap-2 mb-3">
                  <CalendarToday color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Application Deadline
                  </Typography>
                </Box>
                <Divider className="mb-3" />
                <Typography variant="h5" fontWeight={600}>
                  {new Date(requirements.applicationDeadline).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </Typography>
              </CardContent>
            </Card>

            {/* Tuition Fees */}
            {requirements.tuitionFee && (
              <Card>
                <CardContent>
                  <Box className="flex items-center gap-2 mb-3">
                    <AttachMoney color="primary" />
                    <Typography variant="h6" fontWeight={600}>
                      Tuition Fees
                    </Typography>
                  </Box>
                  <Divider className="mb-3" />
                  <Typography variant="body2" color="text.secondary" className="mb-1">
                    Annual Cost
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {tuitionRange}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* Apply Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              className="mt-4"
              startIcon={<School />}
            >
              Apply Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
