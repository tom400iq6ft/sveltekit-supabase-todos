<script lang="ts">
	import { v4 } from "uuid";
	import Todo from "./Todo.svelte";

	let { data } = $props();

	let newTodoDescription = $state("");

	async function createNewTodo() {
		if (newTodoDescription === "") return;
		const { data: createNewTodoData, error: createNewTodoError } = await data.supabase
			.from("todos")
			.insert({ id: v4(), created_at: new Date().toISOString(), description: newTodoDescription, complete: false })
			.select();
		if (createNewTodoError) return; // TODO: Handle error
		newTodoDescription = "";
		data.todos.unshift(createNewTodoData[0]);
	}
</script>

<h1 class="my-8 text-center text-6xl font-semibold text-white/90">Todos</h1>

<div class="flex flex-col items-center gap-y-6">
	<form on:submit|preventDefault={createNewTodo} class="todo">
		<input type="text" bind:value={newTodoDescription} placeholder="New Todo..." />
	</form>

	<!-- TODO: Add ability to batch delete Todos -->
	{#each data.todos as todo}
		<Todo bind:todo {...data} />
	{/each}
</div>

<style lang="postcss">
	.todo {
		@apply h-[60px] w-[600px] text-white/90;

		input {
			@apply h-full w-full bg-slate-800/90 px-8 outline-slate-600 focus:outline focus:outline-2;
		}
	}
</style>
