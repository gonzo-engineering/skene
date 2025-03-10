<script lang="ts">
	let { images }: { images: string[] } = $props();
</script>

<h3>Gallery</h3>
<div class="gallery">
	{#each images as image}
		<div class="polaroid">
			<img src={image} alt="Artwork" loading="lazy" />
		</div>
	{/each}
</div>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
	}
	.polaroid {
		padding: 0.5rem 0.5rem 3rem 0.5rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		background-color: #f8f8f0;
	}
	img {
		aspect-ratio: 1;
		object-fit: cover;
	}
	@media (min-width: 768px) {
		.gallery {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
