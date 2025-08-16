import { Grid, Typography, Box, Paper } from '@mui/material';
import categories from '../db/categories';

const StoreCategories = () => {
  return (
    <Box maxWidth="lg" mx="auto" px={2} py={4}>
      <Typography variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: '24px',
        }}>
        Shop by Category
      </Typography>

      {/* Grid container for categories */}
      <Grid container spacing={4}
        sx={{
          p: 2,
          pt: 1,
          pl: 1,
        }}
      >
        {categories.map((cat) => (
          <Grid key={cat.id}>
            <Box display="flex" flexDirection="column" alignItems="center">

              {/* Square image placeholder */}
              <Paper
                elevation={1}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              />

              {/* Category name */}
              <Typography
                variant="body2"
                sx={{
                  marginTop: '1px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
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
