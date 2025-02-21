import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required");
}

// Initialize the Supabase client
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
