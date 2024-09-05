<script lang="ts">
	import { supabase } from '../../supabaseClient';
	import { createEventDispatcher } from 'svelte';
	import GigsTable from '$lib/components/GigsTable.svelte';
	import { invalidateAll } from '$app/navigation';
	import { artistDetails } from '../../data/info/artist';
	import type { GigDetails } from '$lib/interfaces/gigs';

	export let data: { gigs: GigDetails[] };

	const pastShows = data.gigs.filter((gig) => new Date(gig.dateTimeStart) < new Date());
	const upcomingShows = data.gigs.filter((gig) => new Date(gig.dateTimeStart) >= new Date());

	const dispatch = createEventDispatcher();

	$: gig = {
		venue: '',
		address: '',
		dateTimeStart: '',
		ticketLink: undefined
	};

	const handleSubmit = async (gig: {
		venue: string;
		address: string;
		dateTimeStart: string;
		ticketLink: string | undefined;
	}) => {
		const { data, error } = await supabase.from('gigs').insert([gig]);

		gig = {
			venue: '',
			address: '',
			dateTimeStart: '',
			ticketLink: undefined
		};

		if (error) {
			console.error('Error adding gig:', error.message);
		} else {
			if (data) dispatch('gigAdded', data[0]);
		}
	};

	const handleDelete = async (id: number) => {
		const { error } = await supabase.from('gigs').delete().eq('id', id);

		if (error) {
			console.error('Error deleting gig:', error.message);
		} else {
			dispatch('gigDeleted', id);
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
			<input type="text" placeholder="Venue" bind:value={gig.venue} />
			<input type="text" placeholder="Address" bind:value={gig.address} />
			<input type="datetime-local" bind:value={gig.dateTimeStart} />
			<input type="url" placeholder="Ticket link (Optional)" bind:value={gig.ticketLink} />

			<button on:click={() => handleSubmit(gig)}>Add gig</button>
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
