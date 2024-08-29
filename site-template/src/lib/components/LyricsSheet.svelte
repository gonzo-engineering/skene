<script>
	export let lyrics;
</script>

<div class="sheet box-shadow" style="transform: rotate({Math.random() * 2 - 1}deg);">
	<pre>{lyrics}</pre>
</div>

<style>
	.sheet {
		background-color: #f0efe7;
		background-image: url('https://www.transparenttextures.com/patterns/lined-paper-2.png');
		padding: 2rem;
		margin-bottom: 2rem;
		color: rgb(18, 18, 55);
	}

	pre {
		white-space: pre-wrap;
		text-align: left;
		margin-bottom: 3rem;
		font-weight: 300;
		line-height: 1.3;
	}
</style>
