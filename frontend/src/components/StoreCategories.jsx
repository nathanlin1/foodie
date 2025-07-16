import { Grid, Typography, Box, Paper } from '@mui/material';

const temporaryCategories = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
}));

const StoreCategories = () => {
  return (
    <Box maxWidth="lg" mx="auto" px={2} py={4}>
      <Typography variant="h6">
        Shop by Category
      </Typography>

      <Grid container spacing={3}>
        {temporaryCategories.map((cat) => (
          <Grid item xs={3} key={cat.id}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Paper
                elevation={1}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 2,
                  backgroundColor: '#f0f0f0',
                }}
              />
              <Typography
                variant="body2"
                sx={{ marginTop: 1, fontWeight: 500, textAlign: 'center' }}
              >
                {cat.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StoreCategories;
