import { Card, Skeleton, CardContent } from "@mui/material";

interface MovieCardSkeletonProps {
  count?: number;
}

export const MovieCardSkeleton = ({ count = 4 }: MovieCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ maxWidth: 200, height: 300 }} elevation={0}>
          <Skeleton variant='rectangular' width={200} height={220} />
          <CardContent>
            <Skeleton variant='rectangular' />
            <Skeleton variant='text' />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
