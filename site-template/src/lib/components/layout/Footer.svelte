<script>
	import { artistDetails } from '../../../data/info/artist';
	import Icon from '../Icon.svelte';
	import { icons } from '../../utils/icon-paths';
</script>

<footer>
	<ul>
		<li>
			<a href={artistDetails.socialLinks.spotify}>
				<Icon icon={icons.spotify} />
			</a>
		</li>
		<li>
			<a href={artistDetails.socialLinks.appleMusic}>
				<Icon icon={icons.apple} />
			</a>
		</li>
		<li>
			<a href={artistDetails.socialLinks.instagram}>
				<Icon icon={icons.instagram} />
			</a>
		</li>
		<li>
			<a href={artistDetails.socialLinks.youTube}>
				<Icon icon={icons.youTube} />
			</a>
		</li>
		<li>
			<a href="/contact">
				<Icon icon={icons.envelope} />
			</a>
		</li>
	</ul>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 0 4rem 0;
		width: 100%;
		overflow: hidden;
	}

	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0;
		gap: 1rem;
	}

	li {
		list-style: none;
	}

	a {
		text-decoration: none;
		padding: 0 0.5rem;
	}
</style>
