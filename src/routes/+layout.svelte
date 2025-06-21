<script>
	import Header from './Header.svelte';
	import '../app.css';
	import { page } from '$app/state'; 

	let { children } = $props();

	// Use the pageStore with $derived, accessing its value with $
	const isHomepage = true;
</script>

<div class="app" class:homepage-background={isHomepage}>
	<Header />

	<main>
		{@render children()}
	</main>
</div>

<style>
	/* Global styles for the app container */
	.app {
		min-height: 100vh; /* Ensure it takes full viewport height */
		display: flex;
		flex-direction: column;
	}

	/* Styles for the homepage background */
	.homepage-background {
		/* Corrected image path in CSS if it's relative to the stylesheet */
		background-image: url('/img/bojongsalawe_bg.jpg'); /* Verify this path */
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		/* You might want to adjust background-attachment if you want it fixed or scroll with content */
		/* background-attachment: fixed; */
	}

	/* Ensure main content takes remaining space */
	main {
		flex: 1; /* Allows main to grow and take available space */
	}
</style>