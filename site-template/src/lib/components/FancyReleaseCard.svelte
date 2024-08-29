<script lang="ts">
	import type { Release } from '../../data/interfaces/releases';
	import ArtworkImage from './ArtworkImage.svelte';

	export let release: Release;
	export let subheading: string;
	export let discType: 'CD' | 'Vinyl' = 'CD';

	const rings = 30;
	const radius = 11;
	const cx = 10;
	const cy = 12;
</script>

<h3 class="name">{release.name}</h3>
<div class="subheading">{subheading}</div>
<div class="container">
	<div class="card-image">
		<a href={`/music/${release.slug}`}>
			<ArtworkImage frontSrc={`/artwork/${release.artwork.front}`} name={release.name} />
		</a>
	</div>
	<div class="disc">
		<svg viewBox="0 0 24 24">
			{#if discType === 'CD'}
				<circle
					{cx}
					{cy}
					r={radius}
					class="box-shadow"
					fill="#f5f5f5"
					stroke="lightgray"
					stroke-width="0.1"
				/>
			{/if}
			{#if discType === 'Vinyl'}
				<circle {cx} {cy} r={radius} class="box-shadow" />
				{#each Array.from({ length: rings }, (_, i) => i) as _, i}
					<circle {cx} {cy} r={radius - i * 0.2} stroke-width="0.05" stroke="black" />
				{/each}
			{/if}
		</svg>
	</div>
</div>

<style>
	.name {
		font-size: 2.4rem;
		margin-bottom: 0;
	}
	.subheading {
		font-size: 1.6rem;
		font-weight: 300;
		color: rgb(85, 85, 85);
		margin-bottom: 1rem;
	}
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		margin-bottom: 2rem;
		transition: transform 0.7s;
	}
	.container:hover {
		transform: scale(1.05) rotate(-5deg);
		transition: transform 0.7s;
	}
	.card-image {
		grid-area: 1 / 1 / 2 / 5;
		z-index: 5;
		background-color: white;
		height: fit-content;
	}
	.card-image:hover + .disc {
		transform: translateX(8%);
		transition: transform 0.7s;
	}
	.disc {
		grid-area: 1 / 2 / 2 / 6;
		z-index: 2;
		height: 100%;
		transition: transform 0.7s;
	}
	.disc svg {
		width: 100%;
		height: 100%;
		fill: #222;
	}
	a:hover {
		opacity: 1;
	}
</style>
