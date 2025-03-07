<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { artistDetails } from '../data/data';
	import { gigs } from '../data/data';

	const hasUpcomingGigs = gigs.some((gig) => new Date(gig.dateTime) > new Date());
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

<Header {hasUpcomingGigs} />

<main>
	<slot />
</main>

<Footer />
