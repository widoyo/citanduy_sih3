<script lang="ts">
  import "../../app.css";
  import HeaderNav from "$lib/components/HeaderNav.svelte";
  let { children } = $props();
</script>
<div class="relative px-8">
	<HeaderNav />
</div>
<div class="px-4 md:px-12 mt-20 ">
  {@render children()}
</div>
<footer>
	<div class="flex p-4 mt-20">
		<p class="flex-1"><img src="/img/logo-pupr.png" alt="PUPR" class=""></p>
		<p class="flex-1 text-sm text-muted-foreground">© 2025 BBWS Citanduy</p>
	</div>
</footer>