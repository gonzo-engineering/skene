<script lang="ts">
	import type { GigDetails } from '$lib/interfaces/gigs';
	import { formatDate, prettifyStartTime } from '$lib/utils/utils';

	interface Props {
		gigs: GigDetails[];
		handleDeleteFunction: (id: number) => Promise<void>;
	}

	let { gigs, handleDeleteFunction }: Props = $props();
</script>

<table>
	<thead>
		<tr>
			<th>Venue</th>
			<th>Address</th>
			<th>Date and time</th>
			<th>Ticket link</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each gigs as gig}
			<tr>
				<td>{gig.venue}</td>
				<td>{gig.address}</td>
				<td
					>{formatDate(new Date(gig.dateTimeStart))}
					- {prettifyStartTime(new Date(gig.dateTimeStart))}
				</td><td
					>{#if gig.ticketLink}
						<a href={gig.ticketLink} target="_blank">{gig.ticketLink}</a>
					{:else}
						-
					{/if}
				</td>
				<td><button onclick={() => handleDeleteFunction(gig.id)}>Delete</button></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		min-width: 800px;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid #9e9e9e;
		padding: 0.5rem;
	}
	th {
		background-color: #222;
		color: white;
	}
</style>
