<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '../Icon.svelte';
	import { icons } from '../../utils/icon-paths';

	export let href: string;
	export let title: string;
	export let targetBlank: boolean = false;
</script>

<a
	{href}
	class:active={($page.url.pathname.includes(href) && href !== '/') ||
		($page.url.pathname === '/' && href === '/')}
	target={targetBlank ? 'target="_blank"' : ''}
	>{title}
	{#if targetBlank}
		<Icon icon={icons.externalLink} size={'0.8rem'} />
	{/if}
</a>

<style>
	a {
		font-size: 0.9rem;
		text-decoration: none;
		text-transform: uppercase;
		padding: 0.3rem 0.7rem 0.2rem 0.7rem;
		border-radius: 7px;
		font-weight: bold;
		color: #323232;
	}
	a.active {
		color: lightgray;
		background-color: #323232;
	}
</style>
