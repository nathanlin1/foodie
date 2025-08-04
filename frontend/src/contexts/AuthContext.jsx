import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch user info from backend /user endpoint using token
  const fetchUser = async (token) => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch('/api/v0/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  // On mount, fetch user if token exists
  useEffect(() => {
    fetchUser(token);
  }, [token]);

  // Email/password login (calls backend /login)
const signInWithEmail = async (email, password) => {
  setLoading(true);
  setErrorMsg('');
  try {
    const res = await fetch('/api/v0/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });


    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.error || 'Login failed');
      setLoading(false);
      return false;
    }

    // Save token and fetch user info
    setToken(data.token);
    localStorage.setItem('token', data.token);
    await fetchUser(data.token);

    setLoading(false);
    return true;
  } catch (err) {
    console.error('Network error:', err); 
    setErrorMsg('Network error');
    setLoading(false);
    return false;
  }
};


  // Google login (calls backend /login/google, redirects browser)
  const signInWithGoogle = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/v0/login/google');
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Google login failed');
        setLoading(false);
        return false;
      }

      // Redirect to the OAuth URL returned by backend
      window.location.href = data.url;
      return true;
    } catch {
      setErrorMsg('Network error');
      setLoading(false);
      return false;
    }
  };

  // Logout: clear token and user
  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        errorMsg,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        setErrorMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// Hook for convenience
export const useAuth = () => useContext(AuthContext);
