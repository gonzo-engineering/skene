<script lang="ts">
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { artistDetails } from '../../data/info/artist';
	import GigsTable from '$lib/components/admin/GigsTable.svelte';

	export let data: PageData;

	$: ({ supabase, user, gigs } = data);

	$: pastShows = gigs.filter((gig) => new Date(gig.dateTimeStart) < new Date());
	$: upcomingShows = gigs.filter((gig) => new Date(gig.dateTimeStart) >= new Date());

	$: newGig = {
		venue: '',
		address: '',
		dateTimeStart: '',
		ticketLink: ''
	};

	const handleSubmit = async (gig: {
		venue: string;
		address: string;
		dateTimeStart: string;
		ticketLink: string | undefined;
	}) => {
		const { error } = await supabase.from('gigs').insert([gig]);

		newGig = {
			venue: '',
			address: '',
			dateTimeStart: '',
			ticketLink: ''
		};

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
	<div class="gigs-section">
		<div class="add-gig-section">
			<h3>Add a gig</h3>
			<form>
				<input type="text" placeholder="Venue" bind:value={newGig.venue} />
				<input type="text" placeholder="Address" bind:value={newGig.address} />
				<input type="datetime-local" bind:value={newGig.dateTimeStart} />
				<input type="url" placeholder="Ticket link (Optional)" bind:value={newGig.ticketLink} />

				<button on:click={() => handleSubmit(newGig)}>Add gig</button>
			</form>
		</div>
		<div class="gigs-list-section">
			{#if upcomingShows.length > 0}
				<h3>Upcoming shows</h3>
				<div class="gigs-list">
					<GigsTable gigs={upcomingShows} handleDeleteFunction={handleDelete} />
				</div>
			{:else}
				<p class="no-gigs-message">No upcoming shows.</p>
			{/if}

			{#if pastShows.length > 0}
				<h3>Past shows</h3>
				<div class="gigs-list">
					<GigsTable gigs={pastShows} handleDeleteFunction={handleDelete} />
				</div>
			{:else}
				<p class="no-gigs-message">No previous shows.</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.admin-container {
		width: 90%;
		margin: 0 auto;
	}
	.gigs-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	h2 {
		margin-bottom: 1rem;
	}
	.add-gig-section {
		max-width: 400px;
		width: 100%;
		margin-bottom: 2rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
		overflow-y: auto;
		border: solid 1px #9e9e9e;
	}
</style>
