<script>
	import Header from './Header.svelte';
	import '../app.css';
	import { page } from '$app/state'; 

	let { children } = $props();

	// Use the pageStore with $derived, accessing its value with $
	const isHomepage = true;
</script>

<div class="app">
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

	/* Ensure main content takes remaining space */
	main {
		flex: 1; /* Allows main to grow and take available space */
	}
</style>