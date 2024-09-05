<script lang="ts">
	import { supabase } from '../../supabaseClient';
	import GigsTable from '$lib/components/GigsTable.svelte';
	import { invalidateAll } from '$app/navigation';
	import { artistDetails } from '../../data/info/artist';
	import type { GigDetails } from '$lib/interfaces/gigs';

	export let data: { gigs: GigDetails[] };

	$: pastShows = data.gigs.filter((gig) => new Date(gig.dateTimeStart) < new Date());
	$: upcomingShows = data.gigs.filter((gig) => new Date(gig.dateTimeStart) >= new Date());

	const emptyGigDetails = {
		venue: '',
		address: '',
		dateTimeStart: '',
		ticketLink: ''
	};

	$: newGig = emptyGigDetails;

	const handleSubmit = async (gig: {
		venue: string;
		address: string;
		dateTimeStart: string;
		ticketLink: string | undefined;
	}) => {
		const { error } = await supabase.from('gigs').insert([gig]);

		newGig = emptyGigDetails;

		if (error) {
			console.error('Error adding gig:', error.message);
		} else {
			invalidateAll();
		}
	};

	const handleDelete = async (id: number) => {
		const { error } = await supabase.from('gigs').delete().eq('id', id);

		if (error) {
			console.error('Error deleting gig:', error.message);
		} else {
			invalidateAll();
		}
	};
</script>

<svelte:head>
	<title>Admin · {artistDetails.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="admin-container">
	<div class="add-gig-section">
		<h2>Add a gig</h2>
		<form>
			<input type="text" placeholder="Venue" bind:value={newGig.venue} />
			<input type="text" placeholder="Address" bind:value={newGig.address} />
			<input type="datetime-local" bind:value={newGig.dateTimeStart} />
			<input type="url" placeholder="Ticket link (Optional)" bind:value={newGig.ticketLink} />

			<button on:click={() => handleSubmit(newGig)}>Add gig</button>
		</form>
	</div>

	{#if upcomingShows.length > 0}
		<h2>Upcoming shows</h2>
		<div class="gigs-list">
			<GigsTable gigs={upcomingShows} handleDeleteFunction={handleDelete} />
		</div>
	{:else}
		<p class="no-gigs-message">No upcoming shows.</p>
	{/if}

	{#if pastShows.length > 0}
		<h2>Past shows</h2>
		<div class="gigs-list">
			<GigsTable gigs={pastShows} handleDeleteFunction={handleDelete} />
		</div>
	{:else}
		<p class="no-gigs-message">No previous shows.</p>
	{/if}
</div>

<style>
	.admin-container {
		width: 90%;
		margin: 0 auto;
	}
	.add-gig-section {
		margin-bottom: 3rem;
	}
	h2 {
		margin-bottom: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
		margin: 0 auto;
	}
	input {
		padding: 0.5rem;
	}
	button {
		padding: 0.5rem;
		background-color: #222;
		color: white;
		border: none;
		cursor: pointer;
	}
	button:hover {
		background-color: #333;
	}
	.no-gigs-message {
		text-align: center;
		margin: 3rem 0;
	}
	.gigs-list {
		margin-bottom: 3rem;
	}
</style>
