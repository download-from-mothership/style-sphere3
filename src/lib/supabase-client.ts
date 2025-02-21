import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL:", supabaseUrl);
  console.error("Supabase Anon Key:", supabaseAnonKey ? "Set" : "Not Set");
  throw new Error("Supabase URL and Key are required");
}

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
