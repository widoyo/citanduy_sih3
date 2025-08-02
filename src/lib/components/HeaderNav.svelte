<script lang="ts">
    import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Dropdown, DropdownItem, DropdownDivider, Button } from "flowbite-svelte";
    import { GlobeOutline, ChevronDownOutline, BellRingOutline } from "flowbite-svelte-icons";
</script>

<Navbar class="fixed start-0 top-0 z-20 w-full px-2 py-2 backdrop-blur-sm">
	<NavBrand href="/" class="flex items-center mb-1">
		<span class="font-extrabold me-3">SIH3</span> WS Citanduy
	</NavBrand>
	<div class="flex gap-2 md:hidden">
		<Button size="sm" href="/ews" class="bg-red-500"><BellRingOutline class="inline me-1" /> EWS</Button>
		<Button size="sm" href="/geo" outline={true}><GlobeOutline class="inline me-1" /> Geospatial</Button>
		<NavHamburger />
	</div>
	<NavUl>
		<NavLi href="/" class="text-gray-900 dark:text-white">
			Home
		</NavLi>
		<NavLi href="/#hidrologi" class="text-gray-900 dark:text-white">
			Hidrologi
		</NavLi>
		<NavLi href="/#meteorologi" class="text-gray-900 dark:text-white">
			Hidrometeorologi
		</NavLi>
		<NavLi href="/#hidrogeologi" class="text-gray-900 dark:text-white">
			Hidrogeologi
		</NavLi>
		<NavLi>About<ChevronDownOutline class="text-primary-800 ms-2 inline h-6 w-6 dark:text-white" />
    </NavLi>
    <Dropdown simple class="w-44">
      <DropdownItem href="/#mitra">Mitra</DropdownItem>
      <DropdownItem href="/about/hubungi">Hubungi Kami</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/about/krisan">Kritik Saran</DropdownItem>
    </Dropdown>
	</NavUl>
	<div class="hidden md:flex items-center gap-2 ms-auto">
		<Button size="sm" href="/ews" class="bg-red-500 hidden md:block"><BellRingOutline class="inline me-1" /> EWS</Button>
		<Button size="sm" href="/geo" outline={true} class="md:block"><GlobeOutline class="inline me-1" /> Geospatial</Button>
	</div>
</Navbar>
