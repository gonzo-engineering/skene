<script lang="ts">
	let {
		link,
		label
	}: {
		link: string;
		label: string;
	} = $props();
</script>

<a href={link}>
	<div class="button">{label}</div>
</a>

<style>
	.button {
		background-color: #323232;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		display: inline-block;
		margin: 0 auto;
	}
</style>
