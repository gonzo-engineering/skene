<script lang="ts">
	import { generateGigSchema } from '$lib/utils/schema-generation';
	import { formatDate, prettifyStartTime } from '$lib/utils/utils';
	import Icon from './Icon.svelte';
	import { icons } from '../utils/icon-paths';
	import type { GigDetails } from '$lib/interfaces/gigs';

	export let gig: GigDetails;
	export let isPast: boolean = false;
</script>

<div class={`container card-background box-shadow ${isPast ? 'past-gig' : ''}`}>
	<h4>{gig.venue}</h4>
	<p>
		{formatDate(new Date(gig.dateTime))}
		{#if !isPast}- {prettifyStartTime(new Date(gig.dateTime))}{/if}
	</p>
	{#if !isPast}
		<p>
			{gig.venueAddress} (<a href={`https://maps.google.com/?q=${gig.venueAddress}`} target="_blank"
				>Get directions</a
			>)
		</p>
		<hr />
		<p>
			<a href={gig.ticketLink}>Buy tickets</a>
			<Icon icon={icons.ticket} color="white" size={16} />
		</p>
	{/if}
</div>

{@html `<script type="application/ld+json">${JSON.stringify(generateGigSchema(gig))}</script>`}

<style>
	.container {
		padding: 1rem;
		margin-bottom: 1rem;
		background-color: #222;
		color: lightgray;
		position: relative;
	}
	.past-gig {
		opacity: 0.7;
	}
	a {
		color: lightgray;
	}
	h4 {
		font-size: 1.6rem;
	}
	hr {
		margin: 0.5rem 0;
	}
</style>
