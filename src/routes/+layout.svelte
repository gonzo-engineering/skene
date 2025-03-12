<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { siteDetails } from '../data/data';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<svelte:head>
	{#if siteDetails.goatCounterId}
		<script
			data-goatcounter={`https://${siteDetails.goatCounterId}.goatcounter.com/count`}
			async
			src="//gc.zgo.at/count.js"
		></script>
	{/if}
	{#if siteDetails.favicon}
		<link rel="icon" type="image/png" href={siteDetails.favicon} />
	{/if}
</svelte:head>

<Header />

<main>
	{@render children?.()}
</main>

<Footer />
