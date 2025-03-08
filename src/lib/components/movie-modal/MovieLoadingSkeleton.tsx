import { Stack, Skeleton, Box } from "@mui/material";

export const MovieLoadingSkeleton = () => (
  <Stack
    spacing={3}
    direction={{ xs: "column", md: "row" }}
    alignItems={{ xs: "center", md: "flex-start" }}
  >
    <Skeleton
      variant='rectangular'
      width={300}
      height={450}
      sx={{ borderRadius: 2 }}
    />
    <Box sx={{ width: "100%" }}>
      <Skeleton variant='text' sx={{ fontSize: "2rem", width: "80%" }} />
      <Skeleton variant='text' sx={{ fontSize: "1rem", width: "40%" }} />
      <Box sx={{ mt: 2 }}>
        <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
        <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
        <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
        <Skeleton variant='text' sx={{ fontSize: "1rem", width: "80%" }} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Skeleton variant='text' sx={{ fontSize: "1.5rem", width: "30%" }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          <Skeleton variant='rounded' width={80} height={32} />
          <Skeleton variant='rounded' width={80} height={32} />
          <Skeleton variant='rounded' width={80} height={32} />
        </Box>
      </Box>
    </Box>
  </Stack>
);
