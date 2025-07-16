import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const TopBar = () => {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>

        {/* Hamburger */}
        <IconButton edge="start" color="inherit" aria-label="menu" size="large">
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', color: 'green', ml: 2, display: { xs: 'none', sm: 'block' } }}
        >
          Foodie
        </Typography>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, mx: 3 }}>
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: '2px 12px',
              borderRadius: '999px',
              border: '1px solid #ccc',
            }}
          >
            <InputBase
              placeholder="Search for groceries…"
              sx={{ flex: 1, fontSize: '0.9rem' }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Paper>
        </Box>

        {/* Login Button */}
        <Button variant="outlined" size="small" color="success">
          Login
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
