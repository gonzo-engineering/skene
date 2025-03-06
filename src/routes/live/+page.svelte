<script lang="ts">
	import GigCard from '$lib/components/GigCard.svelte';
	import type { GigDetails } from '$lib/interfaces/gigs';
	import { artistDetails } from '../../data/info/data';

	export let data: { gigs: GigDetails[] };

	const upcomingGigs = data.gigs.filter((gig) => new Date(gig.dateTimeStart) >= new Date());
	const pastGigs = data.gigs.filter((gig) => new Date(gig.dateTimeStart) < new Date());
</script>

<svelte:head>
	<title>Gigs · {artistDetails.name}</title>
	<meta name="description" content="{artistDetails.name}'s upcoming and past gigs." />
</svelte:head>

<div class="container">
	<h2>Upcoming Live Shows ({upcomingGigs.length})</h2>
	{#if upcomingGigs.length > 0}
		<div class="gigs-list">
			{#each upcomingGigs as gig}
				<GigCard {gig} />
			{/each}
		</div>
	{:else}
		<p class="no-gigs-message">Watch this space.</p>
	{/if}

	<div class="gigs-list">
		<h2 class="past-header">Past Shows ({pastGigs.length})</h2>
		{#each pastGigs as gig}
			<GigCard {gig} isPast />
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
	}
	h2 {
		margin-bottom: 1rem;
	}
	.no-gigs-message {
		text-align: center;
		margin: 3rem 0;
	}
	.past-header {
		color: gray;
	}
	.gigs-list {
		margin-bottom: 3rem;
	}
</style>
