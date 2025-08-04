import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function createUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'anna@books.com',
    password: 'annaadmin',
    email_confirm: true, // skips confirmation email
  });

  if (error) {
    console.error('Error creating user:', error);
  } else {
    console.log('User created:', data.user);
  }
}

createUser();