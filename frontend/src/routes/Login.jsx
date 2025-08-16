import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, loading, errorMsg, signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleEmailLogin = async () => {
    const success = await signInWithEmail(email, password);
    if (success) navigate('/');
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  if (loading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
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
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 6, color: 'green' }}>
          Foodie
        </Typography>

        {!user && (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Sign in to Your Account
            </Typography>

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              disabled={loading}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              disabled={loading}
            />

            {errorMsg && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMsg}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleEmailLogin}
              sx={{ mt: 2, textTransform: 'none', borderRadius: '12px', px: 3 }}
              disabled={loading}
            >
              Sign in
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleGoogleLogin}
              sx={{ mt: 3, textTransform: 'none', borderRadius: '12px', px: 3 }}
              disabled={loading}
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
