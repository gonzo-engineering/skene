<script lang="ts">
	import YouTubeEmbed from '../YouTubeEmbed.svelte';

	let { youTubeVidIds } = $props();
</script>

<h3>Videos</h3>
<ul>
	{#each youTubeVidIds as id}
		<li>
			<YouTubeEmbed {id} />
		</li>
	{/each}
</ul>
