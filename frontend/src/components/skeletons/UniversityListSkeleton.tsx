/**
 * University List Skeleton
 * Loading placeholder for university list grid
 */

import { Grid } from '@mui/material';
import { UniversityCardSkeleton } from './UniversityCardSkeleton';

interface UniversityListSkeletonProps {
  count?: number;
}

export function UniversityListSkeleton({ count = 6 }: UniversityListSkeletonProps) {
  return (
    <Grid container spacing={4}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} lg={4}>
          <UniversityCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
