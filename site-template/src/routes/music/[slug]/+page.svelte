<script lang="ts">
	import type { Release } from '../../../data/interfaces/releases';
	import { artistDetails } from '../../../data/info/artist';
	import {
		formatDate,
		formatDurationInSeconds,
		makeArtworkCredit,
		slugifyName
	} from '$lib/utils/utils';
	import ReleaseHeader from '$lib/components/releases/ReleaseHeader.svelte';
	import ReleaseListeningLinks from '$lib/components/releases/ReleaseListeningLinks.svelte';
	import ArtworkImage from '$lib/components/ArtworkImage.svelte';
	import { generateReleaseSchema } from '$lib/utils/schema-generation';
	import ReleaseGallery from '$lib/components/releases/ReleaseGallery.svelte';
	import ReleaseVideos from '$lib/components/releases/ReleaseVideos.svelte';
	import ArtworkFlipping from '$lib/components/ArtworkImage.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: {
		release: Release;
	};

	const release = data.release;

	const {
		name,
		type,
		slug,
		description,
		releaseDate,
		recordedAt,
		artwork,
		listeningLinks,
		tracks,
		otherImages,
		purchaseLink
	} = release;

	const singles = data.release.tracks
		.filter((release) => release.singleDetails)
		.sort(
			(a, b) => a.singleDetails!.releaseDate.getTime() - b.singleDetails!.releaseDate.getTime()
		);

	const youTubeVidIds = data.release.tracks
		.filter((track) => track.youTubeVidId)
		.map((track) => track.youTubeVidId);
</script>

<svelte:head>
	<title>{name} · Music · {artistDetails.name}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="container">
	<ReleaseHeader {name} {type} {releaseDate} />

	<section>
		<ArtworkFlipping
			{name}
			frontSrc={`/artwork/${artwork.front}`}
			backSrc={artwork.back ? `/artwork/${artwork.back}` : undefined}
			caption={makeArtworkCredit(artwork.credits)}
		/>
	</section>

	<section>
		<ReleaseListeningLinks {listeningLinks} />
		<Button link={purchaseLink} label="Buy" />
	</section>

	<section>
		{#if description}
			<div class="description">{description}</div>
		{/if}
		<div class="places-recorded">
			Recorded at
			{#each recordedAt as studio, i}
				{#if studio.link}
					<a href={studio.link}>{studio.name}</a>{#if i < recordedAt.length - 1},&nbsp;{/if}
				{:else}
					{studio.name}{#if i < recordedAt.length - 1},&nbsp;{/if}
				{/if}
			{/each}
		</div>
	</section>

	<section>
		<h3>Tracks</h3>
		<ol>
			{#each tracks as track}
				<li>
					<a href={`/music/${slug}/${slugifyName(track.name)}`}>{track.name}</a>
					<small>{formatDurationInSeconds(track.durationInSeconds)}</small>
				</li>
			{/each}
		</ol>
	</section>

	{#if singles.length > 0}
		<section>
			<h3>Singles</h3>
			<div class="singles">
				{#each singles as single}
					<div>
						<div class="single-artwork box-shadow">
							<a href={`/music/${slug}/${slugifyName(single.name)}`}>
								<ArtworkImage
									frontSrc={`/artwork/${single.singleDetails?.artwork.front}`}
									name={single.name}
								/>
							</a>
						</div>
						<div class="single-details">
							<h4>{single.name}</h4>
							{#if single.singleDetails?.releaseDate}
								<small>{formatDate(single.singleDetails?.releaseDate)}</small>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section>
		<h3>Personnel</h3>
		<ul>
			{#each data.release.personnel as { collaborator, role }}
				<li>
					{#if collaborator.link}
						<a href={collaborator.link}><span class="bold">{collaborator.name}</span></a>
					{:else}
						<span class="bold">{collaborator.name}</span>
					{/if} - {role}
				</li>
			{/each}
		</ul>
		<h4>Tech</h4>
		<ul>
			{#each data.release.technicalCredits as { collaborator, role }}
				<li>
					{#if collaborator.link}
						<a href={collaborator.link}><span class="bold">{collaborator.name}</span></a>
					{:else}
						<span class="bold">{collaborator.name}</span>
					{/if} - {role}
				</li>
			{/each}
		</ul>
	</section>

	{#if youTubeVidIds && youTubeVidIds.length > 0}
		<section>
			<ReleaseVideos {youTubeVidIds} />
		</section>
	{/if}

	{#if otherImages && otherImages.length > 0}
		<section>
			<ReleaseGallery images={otherImages} />
		</section>
	{/if}

	Check out the <a href="/music">music page</a> for other releases.
</div>

{@html `<script type="application/ld+json">${JSON.stringify(
	generateReleaseSchema(release)
)}</script>`}

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}
	.description {
		font-weight: 300;
		margin-bottom: 1rem;
	}
	.singles {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	section {
		margin-bottom: 2.5rem;
	}
	.single-artwork {
		width: 75%;
		margin-left: auto;
		margin-right: auto;
	}
	.release-date,
	.places-recorded {
		margin-top: 1rem;
	}
	.single-details {
		margin: 1rem 0 0 0;
	}
	ul {
		margin-bottom: 2rem;
	}
	.bold {
		font-weight: 600;
	}
	h4 {
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
	}
	@media (min-width: 768px) {
		.singles {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 2rem;
		}
		.single-artwork {
			width: 100%;
		}
	}
</style>
