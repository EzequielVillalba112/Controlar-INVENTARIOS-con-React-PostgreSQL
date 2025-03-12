import { createClient } from "@supabase/supabase-js";
 
export const SUPABASE = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY,
);