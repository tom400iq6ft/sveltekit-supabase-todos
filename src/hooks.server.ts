import type { Handle } from "@sveltejs/kit";

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";

export const handle = (async ({ event, resolve }) => {
	const supabaseServer = createSupabaseServerClient<Database.Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event,
	});

	event.locals.supabase = supabaseServer;

	event.locals.getSession = async () => {
		const {
			data: { session },
		} = await supabaseServer.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range";
		},
	});
}) satisfies Handle;
