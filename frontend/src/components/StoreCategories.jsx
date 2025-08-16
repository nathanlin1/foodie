import { Grid, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StoreCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('api/v0/categories');
      const data = await res.json();
      setCategories(data.categories);
    }

    fetchCategories();
  }, []);

  const handleClick = (category) => {
    const slug = category.id
    navigate(`../category/${slug}`)
  }

  return (
    <Box maxWidth="lg" mx="auto" px={2} py={4}>
      {/*Section title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
        }}>
        Shop by Category
      </Typography>

      {/* Grid container for categories */}
      <Grid container spacing={4}>
        {categories.map((cat) => (
          <Grid key={cat.id}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >

              {/* Square image placeholder */}
              <Paper
                elevation={3}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: 3,
                  mb: 2,
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#777',
                  fontSize: '18px',
                }}
                onClick={() => handleClick(cat)}
              />

              {/* Category name */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: '#333',
                  '&:hover': {
                    color: '#1976d2',
                  },
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
