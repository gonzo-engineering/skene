<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<iframe
	width="100%"
	src={`https://www.youtube.com/embed/${id}`}
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
	loading="lazy"
></iframe>

<style>
	iframe {
		aspect-ratio: 16 / 9;
		border-radius: 20px;
	}
</style>
