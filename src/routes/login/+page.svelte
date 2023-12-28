<script lang="ts">
	let { data } = $props();

	let email = $state("");
	let password = $state("");

	let fail = $state(false);

	async function login() {
		const { error } = await data.supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			fail = true;
			await new Promise((r) => setTimeout(r, 800));
			fail = false;
		}
	}
</script>

<div class="flex flex-col items-center gap-y-4">
	<h1 class="my-8 text-6xl font-semibold text-white/90">Todos</h1>
	<input type="email" bind:value={email} placeholder="Email Address" class:fail />
	<input type="password" bind:value={password} placeholder="Password" class:fail />
	<button on:click={login} class:fail>Login</button>
</div>

<style lang="postcss">
	input {
		@apply h-[70px] w-[600px] bg-slate-600 px-8 text-white outline-slate-300 focus:outline focus:outline-2;
	}
	button {
		@apply mt-4 rounded-md bg-blue-900 px-8 py-4 text-2xl text-white/80;
		@apply focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-blue-300;
	}

	.fail {
		@keyframes shake {
			0% {
				margin-left: 0;
			}
			25% {
				margin-left: 0.5rem;
			}
			75% {
				margin-left: -0.5rem;
			}
			100% {
				margin-left: 0;
			}
		}
		animation: shake 0.2s ease-in-out 0s 2;
		box-shadow: 0 0 0.6rem #ff0000;
		@apply outline outline-[0.5px] outline-red-400 !important;
	}
</style>
