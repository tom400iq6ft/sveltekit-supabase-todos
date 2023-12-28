import { SupabaseClient, Session } from "@supabase/supabase-js";
import { Database as SupabaseDatabase } from "../types/Database/supabase";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<SupabaseDatabase>;
			getSession(): Promise<Session | null>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
export {};
