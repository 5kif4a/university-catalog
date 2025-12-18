import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import Layout from "@/components/Layout";

/**
 * AboutPage Component
 *
 * Example page showing the tech stack
 */
export default function AboutPage() {
  return (
    <Layout>
      <Box className="text-center mb-8">
        <Typography variant="h3" component="h1" className="mb-4">
          Tech Stack
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Modern technologies for building scalable applications
        </Typography>
      </Box>

      <Stack gap={1} mt={2}>
        {techStack.map((tech, index) => (
          <Card key={index} elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                className="mb-2"
                color="primary"
              >
                {tech.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-2"
              >
                {tech.description}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                className="font-mono"
              >
                v{tech.version}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Layout>
  );
}

const techStack = [
  {
    name: "React 19",
    version: "19.0.0",
    description:
      "Modern UI library with latest features and performance improvements",
  },
  {
    name: "TypeScript",
    version: "5.6.2",
    description: "Type-safe JavaScript for better developer experience",
  },
  {
    name: "Vite",
    version: "6.0.5",
    description: "Lightning-fast build tool with HMR",
  },
  {
    name: "Material UI",
    version: "7.3.6",
    description: "Comprehensive component library with modern design",
  },
  {
    name: "TanStack Router",
    version: "1.141.6",
    description: "Fully type-safe routing for React applications",
  },
  {
    name: "Tailwind CSS",
    version: "4.1.18",
    description: "Utility-first CSS framework for rapid UI development",
  },
];
