<script lang="ts">
	import YouTubeEmbed from '../YouTubeEmbed.svelte';

	export let youTubeVidIds;
</script>

<h3>Videos</h3>
<ul>
	{#each youTubeVidIds as id}
		<li>
			<YouTubeEmbed {id} />
		</li>
	{/each}
</ul>
