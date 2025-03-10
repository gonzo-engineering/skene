<script lang="ts">
	import ArtworkImage from '$lib/components/ArtworkImage.svelte';
	import LyricsSheet from '$lib/components/LyricsSheet.svelte';
	import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';
	import type { Release, Track } from '$lib/interfaces/releases';
	import { formatDate, makeArtworkCredit } from '$lib/utils/utils';
	import { artistDetails } from '../../../../data/data';

	let {
		data
	}: {
		data: {
			track: Track;
			parentRelease: Release;
		};
	} = $props();

	const inferNthSingle = (track: Track) => {
		const singles = data.parentRelease.songs
			.filter((release) => release.singleDetails)
			.sort(
				(a, b) =>
					new Date(a.singleDetails!.releaseDate).getTime() -
					new Date(b.singleDetails!.releaseDate).getTime()
			);
		return singles.indexOf(track) + 1;
	};
</script>

<svelte:head>
	<title>{data.track.name} · {data.parentRelease.name} · Music · {artistDetails.name}</title>
	<meta
		name="description"
		content="Lyrics, credits, and media for {data.track.name} from the release {data.parentRelease
			.name}."
	/>
</svelte:head>

<div class="container">
	<div class="head">
		<h2>{data.track.name}</h2>
		<div>
			{data.track.singleDetails ? `Single #${inferNthSingle(data.track)} from` : 'From'}
			<a href={`/music/${data.parentRelease.slug}`}>{data.parentRelease.name}</a>
		</div>
	</div>

	{#if data.track.singleDetails}
		<ArtworkImage frontSrc={data.track.singleDetails.coverImage} name={data.track.name} />
		<div class="release-date">
			Released
			<time datetime={data.track.singleDetails.releaseDate.toString()}
				>{formatDate(data.track.singleDetails.releaseDate)}
			</time>
		</div>
	{/if}

	{#if data.track.youTubeVidId}
		<h3>Video</h3>
		<YouTubeEmbed id={data.track.youTubeVidId} />
	{/if}

	{#if data.track.lyrics}
		<h3 id="lyrics">Lyrics</h3>
		<LyricsSheet lyrics={data.track.lyrics} />
	{/if}

	Check out the <a href="/music">music page</a> for more.
</div>

<style>
	.container {
		max-width: 800px;
		width: 90%;
		margin: 0 auto;
		text-align: center;
	}
	.head {
		margin-bottom: 2rem;
	}

	h2 {
		margin-bottom: 0;
	}

	h3 {
		margin-top: 2rem;
		margin-bottom: 1rem;
	}
	.release-date {
		margin: 2rem 0;
	}
</style>
