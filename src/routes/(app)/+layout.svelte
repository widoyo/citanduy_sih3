<script lang="ts">
  import "../../app.css";
  import HeaderNav from "$lib/components/HeaderNav.svelte";
  let { children } = $props();
</script>
<HeaderNav />
<div class="container px-12 mt-20 min-h-screen h-full">
  {@render children()}
</div>
<div class="flex justify-center items-center p-4 mt-20">
	<p class="text-sm text-muted-foreground">Made with svelte</p>
  	<p class="text-sm text-muted-foreground">© 2025 BBWS Citanduy</p>
</div>
