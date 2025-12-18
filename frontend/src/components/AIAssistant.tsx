import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  Autocomplete,
} from '@mui/material';
import { SmartToy, CompareArrows, Recommend } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { useUniversities } from '@/lib/query/hooks/useUniversities';

/**
 * AI Assistant Component
 *
 * Provides AI-powered features:
 * - University recommendations based on criteria
 * - University comparisons
 */

interface AIResponse {
  recommendations?: string;
  comparison?: string;
  error?: string;
}

export default function AIAssistant() {
  const [recommendOpen, setRecommendOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  // Recommend form state
  const [query, setQuery] = useState('');
  const [score, setScore] = useState<number | ''>('');
  const [country, setCountry] = useState('');
  const [specialty, setSpecialty] = useState('');

  // Compare form state
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);

  const { data: universitiesData } = useUniversities();
  const universities = universitiesData?.items || [];

  const handleRecommend = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: `session_${Date.now()}`,
          query: query.trim(),
          user_score: score || undefined,
          preferred_country: country || undefined,
          preferred_specialty: specialty || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse({ recommendations: data.recommendations });
      } else {
        setResponse({ error: data.error || 'Failed to get recommendations' });
      }
    } catch (error) {
      setResponse({ error: 'Could not connect to AI service' });
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    if (selectedUniversities.length < 2) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: `session_${Date.now()}`,
          university_names: selectedUniversities,
          comparison_criteria: ['ranking', 'tuition fees', 'acceptance rate', 'requirements'],
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse({ comparison: data.comparison });
      } else {
        setResponse({ error: data.error || 'Failed to compare universities' });
      }
    } catch (error) {
      setResponse({ error: 'Could not connect to AI service' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseRecommend = () => {
    setRecommendOpen(false);
    setResponse(null);
    setQuery('');
    setScore('');
    setCountry('');
    setSpecialty('');
  };

  const handleCloseCompare = () => {
    setCompareOpen(false);
    setResponse(null);
    setSelectedUniversities([]);
  };

  return (
    <>
      {/* AI Cards */}
      <Box sx={{ mb: 8 }}>
        <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" gap={3}>
          {/* Recommend Card */}
          <Card
            sx={{
              width: { xs: '100%', sm: 300 },
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
            onClick={() => setRecommendOpen(true)}
          >
            <CardContent>
              <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Recommend sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h6" align="center" sx={{ fontWeight: 500 }}>
                  Get AI Recommendations
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Find perfect universities based on your profile and preferences
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Compare Card */}
          <Card
            sx={{
              width: { xs: '100%', sm: 300 },
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
            onClick={() => setCompareOpen(true)}
          >
            <CardContent>
              <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CompareArrows sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h6" align="center" sx={{ fontWeight: 500 }}>
                  Compare Universities
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Get AI-powered comparison of multiple universities
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Recommend Dialog */}
      <Dialog
        open={recommendOpen}
        onClose={handleCloseRecommend}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SmartToy color="primary" />
            <Typography variant="h6">AI University Recommendations</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="What are you looking for?"
              placeholder="e.g., Best CS programs with strong AI focus"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              multiline
              rows={3}
              fullWidth
              required
            />

            <TextField
              label="Your Test Score (SAT/equivalent)"
              type="number"
              placeholder="e.g., 1450"
              value={score}
              onChange={(e) => setScore(e.target.value ? Number(e.target.value) : '')}
              fullWidth
              inputProps={{ min: 0, max: 1600 }}
            />

            <TextField
              label="Preferred Country"
              placeholder="e.g., USA"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
            />

            <TextField
              label="Preferred Specialty"
              placeholder="e.g., Computer Science"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              fullWidth
            />

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            )}

            {response?.error && (
              <Alert severity="error">{response.error}</Alert>
            )}

            {response?.recommendations && (
              <Box
                sx={{
                  p: 3,
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <Typography variant="h5" gutterBottom>{children}</Typography>,
                    h2: ({ children }) => <Typography variant="h6" gutterBottom>{children}</Typography>,
                    p: ({ children }) => <Typography variant="body2" paragraph>{children}</Typography>,
                    ul: ({ children }) => <Box component="ul" sx={{ pl: 2 }}>{children}</Box>,
                    ol: ({ children }) => <Box component="ol" sx={{ pl: 2 }}>{children}</Box>,
                  }}
                >
                  {response.recommendations}
                </ReactMarkdown>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRecommend}>Close</Button>
          <Button
            onClick={handleRecommend}
            variant="contained"
            disabled={!query.trim() || loading}
          >
            Get Recommendations
          </Button>
        </DialogActions>
      </Dialog>

      {/* Compare Dialog */}
      <Dialog
        open={compareOpen}
        onClose={handleCloseCompare}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CompareArrows color="primary" />
            <Typography variant="h6">Compare Universities</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Autocomplete
              multiple
              options={universities.map((uni) => uni.name)}
              value={selectedUniversities}
              onChange={(_, newValue) => setSelectedUniversities(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Universities to Compare"
                  placeholder="Choose 2-4 universities"
                />
              )}
              limitTags={3}
            />

            <Typography variant="body2" color="text.secondary">
              Select at least 2 universities for comparison
            </Typography>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            )}

            {response?.error && (
              <Alert severity="error">{response.error}</Alert>
            )}

            {response?.comparison && (
              <Box
                sx={{
                  p: 3,
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <Typography variant="h5" gutterBottom>{children}</Typography>,
                    h2: ({ children }) => <Typography variant="h6" gutterBottom>{children}</Typography>,
                    p: ({ children }) => <Typography variant="body2" paragraph>{children}</Typography>,
                    ul: ({ children }) => <Box component="ul" sx={{ pl: 2 }}>{children}</Box>,
                    ol: ({ children }) => <Box component="ol" sx={{ pl: 2 }}>{children}</Box>,
                    table: ({ children }) => (
                      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', my: 2 }}>
                        {children}
                      </Box>
                    ),
                    th: ({ children }) => (
                      <Box
                        component="th"
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          p: 1,
                          backgroundColor: 'action.hover',
                          fontWeight: 600,
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    td: ({ children }) => (
                      <Box component="td" sx={{ border: '1px solid', borderColor: 'divider', p: 1 }}>
                        {children}
                      </Box>
                    ),
                  }}
                >
                  {response.comparison}
                </ReactMarkdown>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompare}>Close</Button>
          <Button
            onClick={handleCompare}
            variant="contained"
            disabled={selectedUniversities.length < 2 || loading}
          >
            Compare
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
