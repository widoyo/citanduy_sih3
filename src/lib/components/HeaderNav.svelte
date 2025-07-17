<script lang="ts">
    import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Dropdown, DropdownItem, DropdownDivider, Button } from "flowbite-svelte";
    import { GlobeOutline, ChevronDownOutline } from "flowbite-svelte-icons";
</script>

<Navbar class="fixed start-0 top-0 z-20 w-full px-2 py-0 sm:px-4 backdrop-blur-sm">
	<NavBrand href="/">
		<span class="font-extrabold me-3">SIH3</span> WS Citanduy
	</NavBrand>
	<div class="flex md:hidden">
		<Button size="sm" href="/geo" class="bg-red-500"><GlobeOutline class="inline me-1" /> Geospatial</Button>
		<NavHamburger />
	</div>
	<NavUl>
		<NavLi href="/" class="text-gray-900 dark:text-white">
			Home
		</NavLi>
		<NavLi href="/#meteorologi" class="text-gray-900 dark:text-white">
			Hidro Meteorologi
		</NavLi>
		<NavLi href="/#hidrologi" class="text-gray-900 dark:text-white">
			Hidrologi
		</NavLi>
		<NavLi href="/#hidrologi" class="text-gray-900 dark:text-white">
			Hidro Geologi
		</NavLi>
		<NavLi>About<ChevronDownOutline class="text-primary-800 ms-2 inline h-6 w-6 dark:text-white" />
    </NavLi>
    <Dropdown simple class="w-44">
      <DropdownItem href="/#mitra">Mitra</DropdownItem>
      <DropdownItem href="/about/hubungi">Hubungi Kami</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/">Kritik Saran</DropdownItem>
    </Dropdown>
	</NavUl>
	<Button size="sm" href="/geo" class="bg-red-500 hidden md:block"><GlobeOutline class="inline me-1" /> Geospatial</Button>
</Navbar>
