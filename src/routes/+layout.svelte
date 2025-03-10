<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { artistDetails } from '../data/data';
	import { gigs } from '../data/data';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
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

<Header />

<main>
	{@render children?.()}
</main>

<Footer />
