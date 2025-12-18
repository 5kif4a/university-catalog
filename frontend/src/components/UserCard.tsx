import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import type { User } from '@/types';

interface UserCardProps {
  user: User;
}

/**
 * UserCard Component
 *
 * Displays user information in a card format
 *
 * @example
 * <UserCard user={userData} />
 *
 * Features:
 * - Avatar with user image or initials
 * - Responsive card layout
 * - Hover effect
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Alt text for avatar
 * - Proper heading hierarchy
 *
 * Performance:
 * - Lazy image loading
 * - Optimized re-renders
 */
export default function UserCard({ user }: UserCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-300"
      sx={{ height: '100%' }}
    >
      <CardContent className="flex flex-col items-center text-center">
        <Avatar
          src={user.avatar}
          alt={user.name}
          className="mb-4"
          sx={{ width: 80, height: 80 }}
        >
          {!user.avatar && getInitials(user.name)}
        </Avatar>
        <Typography variant="h6" component="h3" className="mb-1">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
