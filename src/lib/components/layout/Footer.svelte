<script lang="ts">
	import { artistDetails } from '../../../data/data';
	import Icon from '../Icon.svelte';
	import { icons } from '../../utils/icon-paths';
</script>

<footer>
	<ul>
		{#if artistDetails.socialLinks && artistDetails.socialLinks.length > 0}
			{#each artistDetails.socialLinks as link}
				<li>
					<a href={link}>
						<!-- TODO: Use matching icon where possible -->
						<Icon icon={icons.spotify} />
					</a>
				</li>
			{/each}
		{/if}
		<li>
			<a href="/contact">
				<Icon icon={icons.envelope} />
			</a>
		</li>
	</ul>
	<div>Powered by <a href="https://gonzo.engineering">Gonzo Engineering</a></div>
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
		gap: 1rem;
	}

	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0;
		gap: 1.5rem;
	}

	li {
		list-style: none;
	}
</style>
