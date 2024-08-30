<script>
	import HeaderLink from './HeaderLink.svelte';
	import { artistDetails } from '../../../data/info/artist';

	$: isStuck = false;

	const handleScroll = () => {
		isStuck = window.scrollY > 0;
	};

	// const hasUpcomingGigs =
	// 	gigs.filter((gig) => new Date(gig.dateTimeStart) >= new Date()).length > 0;
</script>

<svelte:window on:scroll={handleScroll} />

<div class="sticky-container" class:box-shadow={isStuck}>
	<!-- {#if hasUpcomingGigs}
		<div class="live-promo card-background">
			<a href="/live">All upcoming lives dates</a>
		</div>
	{/if} -->
	<header>
		<div class="home-link">
			<HeaderLink href="/" title="Home" />
		</div>
		<div class="artist-name">
			<a href="/">{artistDetails.name}</a>
		</div>
		<nav>
			<HeaderLink href="/music" title="Music" />
			<HeaderLink href="/lyrics" title="Lyrics" />
			<HeaderLink href="/live" title="Live" />
			{#if artistDetails.storeUrl}
				<HeaderLink href={artistDetails.storeUrl} title="Shop" targetBlank />
			{/if}
		</nav>
	</header>
</div>

<style>
	.sticky-container {
		position: sticky;
		top: 0;
		z-index: 100;
	}
	.sticky-container a {
		color: lightgray;
	}
	.live-promo {
		background-color: #222;
		text-align: center;
		padding: 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 500;
	}
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		width: 100%;
		overflow: hidden;
		gap: 1.5rem;
		background-color: #dedede;
		transition: box-shadow 0.5s;
	}
	.home-link {
		display: none;
	}
	.artist-name {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.artist-name a {
		color: black;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 500;
		text-transform: uppercase;
	}
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	@media (min-width: 1024px) {
		header {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: 1fr;
			grid-column-gap: 0px;
			grid-row-gap: 0px;
			padding: 1rem 3rem;
		}
		nav {
			justify-content: right;
		}
		.home-link {
			display: block;
		}
	}
</style>
