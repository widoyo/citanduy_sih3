<script lang="ts">
    import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, MegaMenu, Button } from "flowbite-svelte";
    import { GlobeOutline } from "flowbite-svelte-icons";
</script>

<Navbar class="fixed start-0 top-0 z-20 w-full px-2 py-2.5 sm:px-4 backdrop-blur-sm">
	<NavBrand href="/">
		<span class="font-extrabold me-3">SIH3</span> BBWS Citanduy
	</NavBrand>
	<NavHamburger />
	<NavUl class="items-right">
		<NavLi href="/" class="text-gray-900 dark:text-white">
			Home
		</NavLi>
		<NavLi href="/#meteorologi" class="text-gray-900 dark:text-white">
			Hidro Meteorologi
		</NavLi>
		<NavLi href="/#hidrologi" class="text-gray-900 dark:text-white">
			Hidrologi
		</NavLi>
		<NavLi href="/geo" class="text-gray-900 dark:text-white">
			<GlobeOutline class="inline me-1" /> Geospasial
		</NavLi>
	</NavUl>
</Navbar>
