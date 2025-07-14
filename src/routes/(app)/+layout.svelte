<script lang="ts">
  import "../../app.css";
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, MegaMenu, Button } from "flowbite-svelte";
  import { ChevronDownOutline, GlobeOutline } from "flowbite-svelte-icons";

  let { children } = $props();
</script>
<Navbar class="fixed start-0 top-0 z-20 bg-gray-200/10 backdrop-blur border-b border-gray-200 h-[70px] px-4 flex items-center">
	<NavBrand href="/" class="flex items-center">
		<span class="font-extrabold me-3">SIH3</span> BBWS Citanduy
	</NavBrand>
	<NavHamburger class="ml-auto md:hidden" />
	<NavUl class="hidden md:flex gap-4 items-center ml-auto">
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
			<Button size="sm" class="px-3 py-1.5"><GlobeOutline class="inline me-1" /> Geospasial</Button>
		</NavLi>
	</NavUl>
</Navbar>
<div class="container px-12 mt-20">
  {@render children()}
</div>
<div class="flex justify-center items-center p-4 mt-20">
	<p class="text-sm text-muted-foreground">Made with svelte</p>
  	<p class="text-sm text-muted-foreground">© 2025 BBWS Citanduy</p>
</div>
