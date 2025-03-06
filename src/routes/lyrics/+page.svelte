<script lang="ts">
	import { artistDetails } from '../../data/data';
	import { releases, songs } from '../../data/data';

	$: setting = 'all';

	const allTracksWithParentSlug = songs.sort((a, b) => a.name.localeCompare(b.name));
</script>

<svelte:head>
	<title>Lyrics · {artistDetails.name}</title>
	<meta name="description" content="Explore the lyrics for songs by {artistDetails.name}." />
</svelte:head>

<div class="container">
	<h2>Lyrics</h2>
	<div class="options">
		<div class={setting === 'all' ? 'active-option' : ''} on:click={() => (setting = 'all')}>
			All
		</div>
		<div
			class={setting === 'releases' ? 'active-option' : ''}
			on:click={() => (setting = 'releases')}
		>
			By release
		</div>
	</div>

	<div class="tracks-list">
		<div class={`all-list ${setting === 'all' ? 'active' : 'hidden'}`}>
			{#each allTracksWithParentSlug as track}
				{#if track.lyrics}
					<div>
						<a href={`/music/${track.slug}}/${track.slug}#lyrics`}>
							{track.name}
						</a>
					</div>
				{/if}
			{/each}
		</div>
		<div class={`release-list ${setting === 'releases' ? 'active' : 'hidden'}`}>
			{#each releases as release}
				<div class="release-container">
					<h3>{release.name}</h3>
					{#each release.songs as track}
						{#if track.lyrics}
							<div>
								<a href={`/music/${release.slug}/${track.slug}#lyrics`}>
									{track.name}
								</a>
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		padding: 0 1rem;
	}

	.options {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.options div {
		padding: 0.3rem 0.7rem 0.2rem 0.7rem;
		border-radius: 7px;
	}

	.options div:hover {
		cursor: pointer;
	}

	.active-option {
		font-weight: 500;
		background-color: #323232;
		color: lightgray;
	}

	h2 {
		margin-bottom: 1rem;
	}
	h3 {
		font-size: 1.4rem;
	}

	.tracks-list {
		text-align: center;
	}
	.release-container {
		margin-bottom: 2rem;
	}
	.active {
		display: block;
	}
	.hidden {
		display: none;
	}
</style>
