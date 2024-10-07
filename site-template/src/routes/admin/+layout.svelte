<script>
	export let data;
	$: ({ supabase, user } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
</script>

<header>
	<h2>Site admin</h2>
	<div>Logged in as {user?.email}</div>
	<button on:click={logout}>Logout</button>
</header>
<main>
	<slot />
</main>

<style>
	header {
		text-align: center;
	}
</style>
