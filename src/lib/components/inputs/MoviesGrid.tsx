import { Stack, Grid2 } from "@mui/material";

export const MoviesGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack spacing={2} alignItems='center'>
      <Grid2 container spacing={2} justifyContent='center'>
        {children}
      </Grid2>
    </Stack>
  );
};
