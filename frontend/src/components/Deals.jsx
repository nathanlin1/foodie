import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import deals from '../db/deals';

const Deals = () => {
    return (
        <Box maxWidth="lg" mx="auto" px={2} py={4}>
            <Typography variant="h6" fontWeight="bold"
                sx={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                }}>
                Deals & Promotions
            </Typography>

            {/* Grid layout for deals */}
            <Grid container spacing={4} mt={1}>
                {deals.map((deal) => (
                    <Grid key={deal.id}>
                        <Card elevation={2} sx={{ borderRadius: 3, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {deal.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {deal.description}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => navigate(deal.link)}
                                    sx={{ borderRadius: '999px', textTransform: 'none' }}
                                >
                                    {deal.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Deals;
