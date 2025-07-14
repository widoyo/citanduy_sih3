<script lang="ts">
  import "../../app.css";
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, MegaMenu, Button } from "flowbite-svelte";
  import { ChevronDownOutline, GlobeOutline } from "flowbite-svelte-icons";

  let { children } = $props();
</script>
<Navbar class="fixed start-0 top-0 z-20 bg-gray-200/10 backdrop-blur border-b-1 border-gray-200 p-0 m-0">
	<NavBrand href="/">
		<span class="font-extrabold me-3">SIH3</span> BBWS Citanduy
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/" class="text-gray-900 dark:text-white">
			Home
		</NavLi>
		<NavLi href="#meteorologi" class="text-gray-900 dark:text-white">
			Hidro Meteorologi
		</NavLi>
		<NavLi href="#hidrologi" class="text-gray-900 dark:text-white">
			Hidrologi
		</NavLi>
		<NavLi href="/geo" class="text-gray-900 dark:text-white">
			<Button><GlobeOutline class="inline" /> Geospasial</Button>
		</NavLi>
	</NavUl>
</Navbar>
<div class="container mx-auto mt-20">
  {@render children()}
</div>
<div class="flex justify-center items-center p-4">
	<p class="text-sm text-muted-foreground">Made with svelte</p>
  	<p class="text-sm text-muted-foreground">© 2025 BBWS Citanduy</p>
</div>
