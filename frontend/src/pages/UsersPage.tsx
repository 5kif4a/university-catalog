import { Box, Typography } from '@mui/material';
import Layout from '@/components/Layout';
import UserCard from '@/components/UserCard';
import { mockUsers } from '@/mock/data';

/**
 * UsersPage Component
 *
 * Example page displaying a list of users using mock data
 */
export default function UsersPage() {
  return (
    <Layout>
      <Box className="mb-8">
        <Typography variant="h4" component="h1" className="mb-2">
          User Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Example page using mock data and custom components
        </Typography>
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>
    </Layout>
  );
}
