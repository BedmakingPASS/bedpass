// src/services/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jfdqhebrcvjcbzssdwva.supabase.co";
const supabaseKey = "sb_publishable__xz9gwmTgbcdouLnTe-Utg_bYG_jHhk";

export const supabase = createClient(supabaseUrl, supabaseKey);