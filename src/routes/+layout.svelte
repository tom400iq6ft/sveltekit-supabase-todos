<script lang="ts">
	import "../app.postcss";

	import { invalidate } from "$app/navigation";

	let { data } = $props();
	let { supabase, session } = $derived(data);

	$effect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});

	async function signOut() {
		// Strange behavior
		// await supabase.auth.signOut();
		await data.supabase.auth.signOut();
	}
</script>

{#if session}
	<button
		on:click={signOut}
		class="absolute right-0 top-0 mr-4 mt-4 rounded-lg bg-slate-400 px-4 py-3 outline outline-1 focus:outline-slate-300"
		>Sign Out</button
	>
{/if}

<slot />
