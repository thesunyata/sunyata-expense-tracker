
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail-safe initialization to prevent white screen of death
// if environment variables are missing in Vercel.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

// Helper to check if configured
export const isSupabaseConfigured = () => {
    return !!supabaseUrl && !!supabaseAnonKey;
};
