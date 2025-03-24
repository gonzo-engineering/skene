<script lang="ts">
	import { artistDetails } from '../../../data/data';
	import { formatDate, formatDurationInSeconds, makeArtworkCredit } from '$lib/utils/utils';
	import ReleaseHeader from '$lib/components/releases/ReleaseHeader.svelte';
	import ReleaseListeningLinks from '$lib/components/releases/ReleaseListeningLinks.svelte';
	import ArtworkImage from '$lib/components/ArtworkImage.svelte';
	import { generateReleaseSchema } from '$lib/utils/schema-generation';
	import ReleaseGallery from '$lib/components/releases/ReleaseGallery.svelte';
	import ReleaseVideos from '$lib/components/releases/ReleaseVideos.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { Release } from '$lib/interfaces/releases';

	let {
		data
	}: {
		data: {
			release: Release;
		};
	} = $props();

	const release = data.release;

	const {
		name,
		description,
		type,
		slug,
		releaseDate,
		coverImage,
		listeningLinks,
		songs,
		otherImages,
		purchaseLink
	} = release;

	const singles = data.release.songs.filter((release) => release.singleDetails);
	// .sort(
	// 	(a, b) => a.singleDetails!.releaseDate.getTime() - b.singleDetails!.releaseDate.getTime()
	// );

	const youTubeVidIds = data.release.songs
		.filter((track) => track.youTubeVidId)
		.map((track) => track.youTubeVidId);
</script>

<svelte:head>
	<title>{name} · Music · {artistDetails.name}</title>
	<meta name="description" content={`Info and media for '${name}' by ${artistDetails.name}'.`} />
</svelte:head>

<div class="container">
	<ReleaseHeader {name} {type} {releaseDate} />

	<section>
		<ArtworkImage frontSrc={coverImage} {name} />
	</section>

	<!-- <section>
		<ReleaseListeningLinks {listeningLinks} />
		<Button link={purchaseLink} label="Buy" />
	</section> -->

	{#if description}
		<section>
			<p class="description">{description}</p>
		</section>
	{/if}

	<section>
		<!-- <div class="places-recorded">
			Recorded at
			{#each recordedAt as studio, i}
				{#if studio.link}
					<a href={studio.link}>{studio.name}</a>{#if i < recordedAt.length - 1},&nbsp;{/if}
				{:else}
					{studio.name}{#if i < recordedAt.length - 1},&nbsp;{/if}
				{/if}
			{/each}
		</div> -->
	</section>

	<section>
		<h3>Tracks</h3>
		<ol>
			{#each songs as song}
				<li>
					<a href={`/music/${slug}/${song.slug}`}>{song.name}</a>
					<small>{formatDurationInSeconds(song.durationInSeconds)}</small>
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
							<a href={`/music/${slug}/${single.slug}`}>
								<ArtworkImage
									frontSrc={single.singleDetails?.coverImage || ''}
									name={single.name}
								/>
							</a>
						</div>
						<div class="single-details">
							<h4>{single.name}</h4>
							<!-- {#if single.singleDetails?.releaseDate}
								<small>{formatDate(single.singleDetails?.releaseDate)}</small>
							{/if} -->
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if data.release.personnel}
		<section>
			<h3>Personnel</h3>
			<ul>
				{#each data.release.personnel as { name, link, credit }}
					<li>
						{#if link}
							<a href={link}><span class="bold">{name}</span></a>
						{:else}
							<span class="bold">{name}</span>
						{/if} - {credit}
					</li>
				{/each}
			</ul>
		</section>
	{/if}

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
