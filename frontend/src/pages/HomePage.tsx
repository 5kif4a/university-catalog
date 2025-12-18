import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import AIAssistant from "@/components/AIAssistant";
import { PageTransition } from "@/components";

/**
 * HomePage Component
 *
 * Main landing page with Apple-style minimalist design
 * Features smooth animations and generous spacing
 *
 * @example
 * // Used in router configuration
 * <Route path="/" component={HomePage} />
 */
export default function HomePage() {
  return (
    <PageTransition>
      <Box
        className="min-h-screen"
        sx={{ backgroundColor: "background.default" }}
      >
        <Navigation />

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 12, md: 20 } }}>
          <Box sx={{ textAlign: "center", mb: 16 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ mb: 4, fontWeight: 500 }}
            >
              Discover Your Perfect University
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 8,
                fontWeight: 400,
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Explore universities worldwide and get AI-powered recommendations
              tailored to your goals
            </Typography>
            <Box
              className="flex justify-center"
              sx={{ flexWrap: "wrap", gap: 1 }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/universities"
                sx={{ px: 6, py: 1.5 }}
              >
                Explore Universities
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/about"
                sx={{ px: 6, py: 1.5 }}
              >
                Learn More
              </Button>
            </Box>
          </Box>

          {/* AI Assistant */}
          <AIAssistant />

          {/* Feature Cards */}
          <Box
            className="grid grid-cols-1 md:grid-cols-3"
            sx={{ gap: 2 }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
}

// Mock data
const features = [
  {
    icon: "🎓",
    title: "Thousands of Universities",
    description:
      "Browse universities from around the world with detailed information about programs and requirements.",
  },
  {
    icon: "🔍",
    title: "Smart Filters",
    description:
      "Filter by country, specialty, scores, and admission requirements to find your perfect match.",
  },
  {
    icon: "🤖",
    title: "AI Recommendations",
    description:
      "Get personalized university suggestions powered by AI based on your profile and preferences.",
  },
];
