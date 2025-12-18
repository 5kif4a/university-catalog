import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  IconButton,
  Collapse,
  Chip,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Close,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  userScore?: number;
  preferredCountry?: string;
  preferredSpecialty?: string;
}

export default function AIChat({
  userScore,
  preferredCountry,
  preferredSpecialty,
}: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          query: userMessage,
          user_score: userScore,
          preferred_country: preferredCountry,
          preferred_specialty: preferredSpecialty,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.recommendations },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Sorry, I encountered an error: ${data.error}`,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not connect to the AI service.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!expanded) {
    return (
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<SmartToy />}
          onClick={() => setExpanded(true)}
          sx={{
            py: 2,
            px: 3,
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Ask AI Advisor
        </Button>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={6}
      component={motion.div}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: { xs: 'calc(100vw - 48px)', sm: 480 },
        maxWidth: 480,
        height: { xs: 'calc(100vh - 100px)', sm: 600 },
        maxHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <SmartToy />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              AI University Advisor
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={() => setExpanded(false)} sx={{ color: 'white' }}>
              <ExpandMore />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setExpanded(false);
                setMessages([]);
              }}
              sx={{ color: 'white' }}
            >
              <Close />
            </IconButton>
          </Stack>
        </Stack>

        {/* Active Filters */}
        {(userScore || preferredCountry || preferredSpecialty) && (
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
            {userScore && (
              <Chip
                label={`Score: ${userScore}`}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            )}
            {preferredCountry && (
              <Chip
                label={preferredCountry}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            )}
            {preferredSpecialty && (
              <Chip
                label={preferredSpecialty}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            )}
          </Stack>
        )}
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <SmartToy sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  Ask me anything!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  I can help you find the perfect university
                </Typography>
              </Box>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '85%',
                    backgroundColor:
                      message.role === 'user' ? 'primary.main' : 'background.paper',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                  }}
                >
                  {message.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {children}
                          </Typography>
                        ),
                        ul: ({ children }) => (
                          <Box component="ul" sx={{ pl: 2, my: 1 }}>
                            {children}
                          </Box>
                        ),
                        ol: ({ children }) => (
                          <Box component="ol" sx={{ pl: 2, my: 1 }}>
                            {children}
                          </Box>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <Typography variant="body2">{message.content}</Typography>
                  )}
                </Paper>
              </Box>
            </motion.div>
          ))}

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <CircularProgress size={20} />
              </Paper>
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about universities..."
            variant="outlined"
            size="small"
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            sx={{ minWidth: 56, height: 56 }}
          >
            <Send />
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
