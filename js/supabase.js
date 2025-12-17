import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://coavqfhlhzsoipgmstya.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8OPTcU6DrNh1wMS-hYM8Sw_SMmSd8Vn";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
