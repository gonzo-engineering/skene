<script lang="ts">
	import type { ListeningLink } from '../../../data/interfaces/releases';
	import Icon from '$lib/components/Icon.svelte';
	import { icons } from '$lib/utils/icon-paths';

	export let listeningLinks: ListeningLink[];
</script>

<ul class="listening-links">
	{#each listeningLinks as link}
		<li>
			{#if link.name === 'Apple Music'}
				<a href={link.link} target="_blank">
					<Icon icon={icons.apple} />
				</a>
			{/if}
			{#if link.name === 'Bandcamp'}
				<a href={link.link} target="_blank">
					<Icon icon={icons.bandcamp} />
				</a>
			{/if}
			{#if link.name === 'Spotify'}
				<a href={link.link} target="_blank">
					<Icon icon={icons.spotify} />
				</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.listening-links {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin: 2rem 0;
	}
</style>
