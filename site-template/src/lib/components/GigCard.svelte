<script lang="ts">
	import { generateGigSchema } from '$lib/utils/schema-generation';
	import { formatDate } from '$lib/utils/utils';
	import type { GigDetails } from '../../data/gigs/gigs';
	import Icon from './Icon.svelte';
	import { icons } from '../utils/icon-paths';

	export let gig: GigDetails;
	export let isPast: boolean = false;

	const prettifyStartAndEndTimes = (times: { start: Date; end: Date }) => {
		// Return string in format 8:00pm - 10:00pm
		const start = times.start.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
		const end = times.end.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
		return `${start} - ${end}`;
	};
</script>

<div class={`container card-background box-shadow ${isPast ? 'past-gig' : ''}`}>
	<h4>{gig.venue}</h4>
	<p>{formatDate(new Date(gig.dateTimeStart))}</p>
	{#if gig.supporting}
		<hr />
		{#if gig.linkToSupportingArtist}
			<p>Supporting <a href={gig.linkToSupportingArtist}>{gig.supporting}</a></p>
		{:else}
			<p>Supporting {gig.supporting}</p>
		{/if}
	{/if}
	{#if !isPast}
		<p>
			{gig.address} (<a href={`https://maps.google.com/?q=${gig.address}`} target="_blank"
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
	h4 {
		margin-right: 4.5rem;
	}
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
