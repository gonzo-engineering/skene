<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { artistDetails } from '../data/info/artist';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;
	$: ({ session, supabase } = data);

	$: isAdminOrLoginPage =
		$page.url.pathname.startsWith('/admin') || $page.url.pathname.startsWith('/login');

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const prettifyUrl = (url: string) => {
		const urlWithoutProtocol = url.replace(/(^\w+:|^)\/\//, '');
		return urlWithoutProtocol.replace(/\/$/, '');
	};
</script>

<svelte:head>
	{#if artistDetails.goatCounterId}
		<script
			data-goatcounter={`https://${artistDetails.goatCounterId}.goatcounter.com/count`}
			async
			src="//gc.zgo.at/count.js"
		></script>
	{/if}
</svelte:head>

{#if isAdminOrLoginPage}
	<header class="admin-header">
		<h2>
			Site admin for <a href="/">{prettifyUrl(artistDetails.websiteUrl)}</a>
		</h2>
		<div>Logged in as {session?.user.email}</div>
		<button on:click={logout}>Logout</button>
	</header>
{:else}
	<Header hasUpcomingGigs={data.hasUpcomingGigs} />
{/if}

<main>
	<slot />
</main>

<Footer isAdminOrLoginPage />

<style>
	.admin-header {
		text-align: center;
		margin: 2rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	button {
		cursor: pointer;
		width: fit-content;
	}
</style>
