<script>
	import Button from '$lib/components/Button.svelte';
	import { artistDetails } from '../../data/info/artist';
</script>

<svelte:head>
	<title>Contact · {artistDetails.name}</title>
	<meta name="description" content="How to get in touch with {artistDetails.name}." />
</svelte:head>

<main>
	<h2>Contact</h2>

	<p>Feel free to reach out on social media or through the email below.</p>

	<Button link={`mailto:${artistDetails.email}`} label="Email" />
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}
	p {
		font-size: 1.4rem;
		margin: 3rem 0;
	}
</style>
