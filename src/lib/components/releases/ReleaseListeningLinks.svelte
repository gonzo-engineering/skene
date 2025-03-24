<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { ListeningLink } from '$lib/interfaces/releases';
	import { icons } from '$lib/utils/icon-paths';

	let {
		listeningLinks
	}: {
		listeningLinks: string[];
	} = $props();
</script>

<ul class="listening-links">
	{#each listeningLinks as link}
		<li>
			{#if link.includes('apple')}
				<a href={link} target="_blank">
					<Icon icon={icons.apple} />
				</a>
			{/if}
			{#if link.includes('bandcamp')}
				<a href={link} target="_blank">
					<Icon icon={icons.bandcamp} />
				</a>
			{/if}
			{#if link.includes('spotify')}
				<a href={link} target="_blank">
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
