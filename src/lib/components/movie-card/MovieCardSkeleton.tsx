import { Card, Skeleton, CardContent, Grid2, Stack } from "@mui/material";
import { MoviesGrid } from "../inputs/MoviesGrid";

interface MovieCardSkeletonProps {
  count?: number;
}

export const MovieCardSkeleton = ({ count = 4 }: MovieCardSkeletonProps) => {
  return (
    <MoviesGrid>
      <Stack spacing={2} alignItems='center'>
        <Grid2 container spacing={2} justifyContent='center'>
          {Array.from({ length: count }).map((_, index) => (
            <Card key={index} sx={{ maxWidth: 200, height: 300 }} elevation={0}>
              <Skeleton variant='rectangular' width={200} height={220} />
              <CardContent>
                <Skeleton variant='rectangular' />
                <Skeleton variant='text' />
              </CardContent>
            </Card>
          ))}
        </Grid2>
      </Stack>
    </MoviesGrid>
  );
};
