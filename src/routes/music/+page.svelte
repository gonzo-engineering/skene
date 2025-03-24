<script lang="ts">
	import ArtworkImage from '$lib/components/ArtworkImage.svelte';
	import { artistDetails } from '../../data/data';
	import { releases, songs } from '../../data/data';

	let chosenReleaseType = $state('All');

	const lps = releases.filter((release) => release.type === 'LP');
	const eps = releases.filter((release) => release.type === 'EP');
	const singles = songs.filter((song) => song.singleDetails);
</script>

<svelte:head>
	<title>Music · {artistDetails.name}</title>
	<meta name="description" content="Explore {artistDetails.name}'s releases, lyrics, and media." />
</svelte:head>

<div class="container">
	<h2>Music</h2>

	<div class="filters">
		<span
			class={chosenReleaseType === 'All' ? 'active-toggle' : 'toggle'}
			onclick={() => (chosenReleaseType = 'All')}
			onkeydown={() => (chosenReleaseType = 'All')}
			tabindex="0"
			role="button"
		>
			All
		</span>
		{#if lps.length > 0}
			<span
				class={chosenReleaseType === 'LPs' ? 'active-toggle' : 'toggle'}
				onclick={() => (chosenReleaseType = 'LPs')}
				onkeydown={() => (chosenReleaseType = 'LPs')}
				tabindex="0"
				role="button"
			>
				LPs ({lps.length})
			</span>
		{/if}
		{#if eps.length > 0}
			<span
				class={chosenReleaseType === 'EPs' ? 'active-toggle' : 'toggle'}
				onclick={() => (chosenReleaseType = 'EPs')}
				onkeydown={() => (chosenReleaseType = 'EPs')}
				tabindex="0"
				role="button"
			>
				EPs ({eps.length})
			</span>
		{/if}
		{#if singles.length > 0}
			<span
				class={chosenReleaseType === 'Singles' ? 'active-toggle' : 'toggle'}
				onclick={() => (chosenReleaseType = 'Singles')}
				onkeydown={() => (chosenReleaseType = 'Singles')}
				tabindex="0"
				role="button"
			>
				Singles ({singles.length})
			</span>
		{/if}
	</div>

	{#if chosenReleaseType === 'LPs' || (chosenReleaseType === 'All' && lps.length > 0)}
		<h3>LPs</h3>
		<div class="row">
			{#each lps as lp}
				<div>
					<a href={`music/${lp.slug}`}>
						<div>
							<ArtworkImage frontSrc={lp.artwork.front} name={lp.name} />
						</div>
					</a>
					<div style="margin-top: 1rem;">{lp.name}</div>
					<small>{new Date(lp.releaseDate).getFullYear()}</small>
				</div>
			{/each}
		</div>
	{/if}

	{#if chosenReleaseType === 'EPs' || (chosenReleaseType === 'All' && eps.length > 0)}
		<h3>EPs</h3>
		<div class="row">
			{#each eps as ep}
				<div>
					<a href={`music/${ep.slug}`}>
						<div>
							<ArtworkImage frontSrc={ep.artwork.front} name={ep.name} />
						</div>
					</a>
					<div style="margin-top: 1rem;">{ep.name}</div>
					<small>{new Date(ep.releaseDate).getFullYear()}</small>
				</div>
			{/each}
		</div>
	{/if}

	{#if chosenReleaseType === 'Singles' || (chosenReleaseType === 'All' && singles.length > 0)}
		<h3>Singles</h3>
		<div class="row">
			{#each releases.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()) as release}
				{#each release.songs as track}
					{#if track.singleDetails}
						<div>
							<a href={`music/${release.slug}/${track.slug}`}>
								<div>
									<ArtworkImage frontSrc={track.singleDetails.coverImage} name={track.name} />
								</div>
							</a>
							<div style="margin-top: 1rem;">{track.name}</div>
							<small>{new Date(track.singleDetails.releaseDate).getFullYear()}</small>
						</div>
					{/if}
				{/each}
			{/each}
		</div>
	{/if}
</div>

<style>
	h3 {
		margin-bottom: 1rem;
		font-weight: 400;
	}
	.container {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}
	.row {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}
	.filters {
		font-weight: 300;
		margin: 1rem 0 3rem 0;
	}
	.toggle,
	.active-toggle {
		cursor: pointer;
		padding: 0.25rem 0.7rem;
	}
	.active-toggle {
		background-color: #323232;
		color: #dedede;
		border-radius: 0.5rem;
	}
	@media (min-width: 768px) {
		.container {
			width: 100%;
		}
	}
</style>
