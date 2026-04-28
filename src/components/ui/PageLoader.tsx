import { Box, CircularProgress } from "@mui/material";

/* Shown while a lazy chunk is being fetched */
export const PageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
    <CircularProgress />
  </Box>
)
