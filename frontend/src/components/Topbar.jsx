import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const TopBar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSignOut = async () => {
    await signOut();
    handleMenuClose();
    navigate('/'); // optional: redirect after logout
  };

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
          sx={{
            fontFamily: 'Aclonica',
            fontWeight: 'bold',
            fontSize: '32px',
            color: 'green',
            ml: 2,
            display: { xs: 'none', sm: 'block' },
          }}
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
              p: '4px 12px',
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

        {/* Auth Buttons */}
        {user ? (
          <>
            <IconButton
              color="success"
              onClick={handleMenuOpen}
              sx={{ ml: 1 }}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              fontSize: '18px',
              borderRadius: '18px',
              border: 'none',
              backgroundColor: 'rgba(82, 184, 82, 1)',
              color: 'white',
              transition: 'transform 0.2 ease, background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgb(0, 128, 0)',
                border: 'none',
              },
              '&:active': {
                transform: 'scale(0.97)',
              },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
