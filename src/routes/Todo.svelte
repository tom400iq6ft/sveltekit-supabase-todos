<!-- TODO: Visual feedback for loading, error, and success states -->
<script lang="ts">
	import type { SupabaseClient } from "@supabase/supabase-js";

	import { Check } from "lucide-svelte";

	let { todo, supabase } = $props<{ todo: Database.Todo; supabase: SupabaseClient<Database.Database> }>();

	async function updateTodo() {
		if (todo.description === "") {
			const { data: todoData, error: todoError } = await supabase.from("todos").select("description").eq("id", todo.id);
			if (todoError) return; // TODO: Handle error
			todo.description = todoData[0].description;
		} else {
			const { data: todoData, error: todoError } = await supabase.from("todos").update(todo).eq("id", todo.id);
			if (todoError) return; // TODO: Handle error
		}
	}
</script>

<form on:submit|preventDefault={updateTodo} class="todo">
	<input type="text" bind:value={todo.description} on:focusout={updateTodo} />
	<label>
		<input type="checkbox" bind:checked={todo.complete} on:change={updateTodo} />
		<span class="checkbox">
			{#if todo.complete}
				 <!-- BUG: SVG display bug with svelte 5 -->
				<Check color={"#00ffcc"} />
			{/if}
		</span>
	</label>
</form>

<style lang="postcss">
	.todo {
		@apply relative h-[60px] w-[600px] text-white/90;

		input[type="text"] {
			@apply h-full w-full bg-slate-800/90 px-8 outline-slate-600 focus:outline focus:outline-2;
		}

		input[type="checkbox"] {
			height: 0;
			width: 0;
			opacity: 0;

			&:focus-visible ~ .checkbox {
				@apply ring-2;
			}
		}
		.checkbox {
			@apply absolute right-0 top-[50%] mr-3 rounded-sm bg-slate-500/25 outline outline-2 outline-slate-500/50 square-6;
			transform: translateY(-50%);
		}
		input:checked ~ .checkbox {
			@apply bg-blue-800 outline-none;
		}
	}
</style>
