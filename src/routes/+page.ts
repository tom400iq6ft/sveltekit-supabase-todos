import type { PageLoad } from "./$types";

import { error, redirect } from "@sveltejs/kit";

export const load = (async ({ parent, depends }) => {
	depends("supabase:auth");
	const { session, supabase } = await parent();

	if (!session) throw redirect(301, "/login");

	const { data: todosData, error: todosError } = await supabase.from("todos").select().order("created_at", { ascending: false });
	if (todosError) throw error(500);

	return {
		todos: todosData,
	};
}) satisfies PageLoad;
