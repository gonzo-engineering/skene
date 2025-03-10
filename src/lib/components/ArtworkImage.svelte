<script lang="ts">
	import Icon from './Icon.svelte';
	import { icons } from '../utils/icon-paths';
	import { artistDetails } from '../../data/data';

	export let name;
	export let frontSrc;
	export let backSrc: string | undefined = undefined;
	export let caption: string | undefined = undefined;
	$: flipped = false;
</script>

<figure>
	<div class="flip-card" style="--extra:{flipped ? '-180deg' : '0deg'}">
		<div class="inner">
			<div class="front box-shadow">
				<img src={frontSrc} alt={`Front album artwork of ${name} by ${artistDetails.name}`} />
			</div>
			<div class="back box-shadow">
				<img src={backSrc} alt={`Back album artwork of ${name} by ${artistDetails.name}`} />
			</div>
		</div>
	</div>
	{#if caption}
		<figcaption>{@html caption}</figcaption>
	{/if}
</figure>

{#if backSrc}
	<button class="toggle" on:click={() => (flipped = !flipped)} aria-label="Toggle flip">
		Flip <Icon icon={icons.rotate} size={'1rem'} />
	</button>
{/if}

<style>
	figure {
		position: relative;
	}
	.flip-card {
		background-color: transparent;
		aspect-ratio: 1;
		perspective: 1500px;
	}

	.inner {
		position: relative;
		transition: transform 1s;
		transform-style: preserve-3d;
		transform: rotateY(calc(var(--extra)));
	}

	.front,
	.back {
		position: absolute;
		background-color: white;
		backface-visibility: hidden;
		width: 100%;
	}

	.back {
		transform: rotateY(180deg);
	}
	figcaption {
		font-family: Verdana, sans-serif;
		font-size: 0.7rem;
		text-align: right;
		margin-top: 0.5rem;
		color: gray;
	}
	.toggle {
		cursor: pointer;
		margin-top: 1rem;
		font-family: Verdana, sans-serif;
		text-align: center;
		margin-top: 1rem;
		border: none;
		background-color: transparent;
	}
</style>
