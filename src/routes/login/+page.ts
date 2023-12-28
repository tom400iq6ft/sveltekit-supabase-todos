import type { PageLoad } from "./$types";

import { redirect } from "@sveltejs/kit";

export const load = (async ({ parent, depends }) => {
	depends("supabase:auth");
	const { session } = await parent();

	if (session) throw redirect(307, "/");
}) satisfies PageLoad;
