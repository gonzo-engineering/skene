<script lang="ts">
	import { formatDate } from '$lib/utils/utils';

	export let name;
	export let type;
	export let releaseDate;

	const releaseDateAsDate = new Date(releaseDate);
</script>

<div class="container">
	<h2>{name} <span class="release-type">({type})</span></h2>
	<div class="release-date">
		Released <time datetime={releaseDate.toString()}>{releaseDateAsDate.getFullYear()}</time>
	</div>
</div>

<style>
	h2 {
		margin-bottom: 0.5rem;
	}
	.container {
		margin-bottom: 2rem;
	}
	.release-type {
		font-weight: 300;
		color: rgb(85, 85, 85);
	}
	.release-date {
		font-size: 1.4rem;
		margin-bottom: 1rem;
	}
</style>
