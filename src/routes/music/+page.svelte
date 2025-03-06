<script lang="ts">
	import ArtworkImage from '$lib/components/ArtworkImage.svelte';
	import type { Release } from '$lib/interfaces/releases';
	import { slugifyName } from '$lib/utils/utils';
	import { artistDetails } from '../../data/data';

	export let data;

	const releases: Release[] = data.releases;

	$: chosenReleaseType = 'All';

	const lps = releases.filter((release) => release.type === 'LP');
	const eps = releases.filter((release) => release.type === 'EP');
	const singles = releases.flatMap((release) =>
		release.tracks.filter((track) => track.singleDetails)
	);
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
			on:click={() => (chosenReleaseType = 'All')}
		>
			All
		</span>
		<span
			class={chosenReleaseType === 'LPs' ? 'active-toggle' : 'toggle'}
			on:click={() => (chosenReleaseType = 'LPs')}
		>
			LPs ({lps.length})
		</span>
		<span
			class={chosenReleaseType === 'EPs' ? 'active-toggle' : 'toggle'}
			on:click={() => (chosenReleaseType = 'EPs')}
		>
			EPs ({eps.length})
		</span>
		<span
			class={chosenReleaseType === 'Singles' ? 'active-toggle' : 'toggle'}
			on:click={() => (chosenReleaseType = 'Singles')}
		>
			Singles ({singles.length})
		</span>
	</div>

	{#if chosenReleaseType === 'LPs' || chosenReleaseType === 'All'}
		<h3>LPs</h3>
		<div class="row">
			{#each lps as lp}
				<div>
					<a href={`music/${lp.slug}`}>
						<div>
							<ArtworkImage frontSrc={`/artwork/${lp.artwork.front}`} name={lp.name} />
						</div>
					</a>
					<div style="margin-top: 1rem;">{lp.name}</div>
					<small>{lp.releaseDate.getFullYear()}</small>
				</div>
			{/each}
		</div>
	{/if}

	{#if chosenReleaseType === 'EPs' || chosenReleaseType === 'All'}
		<h3>EPs</h3>
		<div class="row">
			{#each eps as ep}
				<div>
					<a href={`music/${ep.slug}`}>
						<div>
							<ArtworkImage frontSrc={`/artwork/${ep.artwork.front}`} name={ep.name} />
						</div>
					</a>
					<div style="margin-top: 1rem;">{ep.name}</div>
					<small>{ep.releaseDate.getFullYear()}</small>
				</div>
			{/each}
		</div>
	{/if}

	{#if chosenReleaseType === 'Singles' || chosenReleaseType === 'All'}
		<h3>Singles</h3>
		<div class="row">
			{#each releases.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime()) as release}
				{#each release.tracks as track}
					{#if track.singleDetails}
						<div>
							<a href={`music/${release.slug}/${slugifyName(track.name)}`}>
								<div>
									<ArtworkImage
										frontSrc={`/artwork/${track.singleDetails.artwork.front}`}
										name={track.name}
									/>
								</div>
							</a>
							<div style="margin-top: 1rem;">{track.name}</div>
							<small>{track.singleDetails.releaseDate.getFullYear()}</small>
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
