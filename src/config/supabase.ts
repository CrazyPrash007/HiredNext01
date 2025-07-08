import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if we have the required environment variables
const hasSupabaseConfig = supabaseUrl && supabaseAnonKey;

// Create the Supabase client only if we have the config
export const supabase = hasSupabaseConfig 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return hasSupabaseConfig;
}; 