import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Box, Button, Typography, Paper } from '@mui/material';

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error('Error getting session:', error);
      else setUser(session?.user || null);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',           // full viewport height
        display: 'flex',
        justifyContent: 'center',  // center horizontally
        alignItems: 'center',      // center vertically
        backgroundColor: '#f3f4f6' // Tailwind gray-100 equivalent
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 360,
          height: 600,
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        {/* Foodie Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 6, color: 'green', }}
        >
          Foodie
        </Typography>

        {/* Conditional content */}
        {user ? (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome, {user.email}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => supabase.auth.signOut()}
              sx={{ mt: 2, textTransform: 'none', borderRadius: '12px', px: 3 }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Sign in to Your Account
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: 'google',
                })
              }
              sx={{ mt: 2, textTransform: 'none', borderRadius: '12px', px: 3 }}
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
