import type { Database as SupabaseDatabase } from "./supabase";

declare global {
	namespace Database {
		export type Database = SupabaseDatabase;
		export type Todo = Database["public"]["Tables"]["todos"]["Row"];
	}
}
