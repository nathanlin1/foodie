import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://csiigcklpcekcvgaukpt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzaWlnY2tscGNla2N2Z2F1a3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzIzMDYsImV4cCI6MjA2ODEwODMwNn0.mGL8SjuEfDURlO9zpLYb3M6rUA_NSQ6FAC8sawxEKBg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);