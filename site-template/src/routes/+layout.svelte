<script>
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { artistDetails } from '../data/info/artist';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	{#if artistDetails.goatCounterId}
		<script
			data-goatcounter={`https://${artistDetails.goatCounterId}.goatcounter.com/count`}
			async
			src="//gc.zgo.at/count.js"
		></script>
	{/if}
</svelte:head>

<Header hasUpcomingGigs={data.hasUpcomingGigs} />

<main>
	<slot />
</main>

<Footer />
