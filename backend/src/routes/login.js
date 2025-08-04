import supabase from '../db.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = data.session.access_token;

  res.status(200).json({ token });
};

export const googleLogin = async (req, res) => {
  const { origin } = req.headers;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  res.status(200).json({ url: data.url });
};