<script>
  // State for the main burger menu (controls visibility across ALL screen sizes)
  let isMenuOpen = false;

  // States for each individual submenu
  let isHidrologiOpen = false;
  let isHidrometeorologiOpen = false;
  let isHidrogeologiOpen = false;
  let isInformasiOpen = false;

  // Function to close all submenus
  function closeAllSubmenus() {
    isHidrologiOpen = false;
    isHidrometeorologiOpen = false;
    isHidrogeologiOpen = false;
    isInformasiOpen = false;
  }

  // Toggle function for the main burger menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    // When the main menu is closed, also close any open submenus
    if (!isMenuOpen) {
      closeAllSubmenus();
    }
  }

  // Toggle function for 'HIDROLOGI' dropdown
  function toggleHidrologi() {
    // Close other top-level submenus if we are about to open this one
    if (!isHidrologiOpen) {
      isHidrometeorologiOpen = false;
      isHidrogeologiOpen = false;
      isInformasiOpen = false;
    }
    isHidrologiOpen = !isHidrologiOpen;
  }

  // Toggle function for 'HIDROMETEOROLOGI' dropdown
  function toggleHidrometeorologi() {
    if (!isHidrometeorologiOpen) {
      isHidrologiOpen = false;
      isHidrogeologiOpen = false;
      isInformasiOpen = false;
    }
    isHidrometeorologiOpen = !isHidrometeorologiOpen;
  }

  // Toggle function for 'HIDROGEOLOGI' dropdown
  function toggleHidrogeologi() {
    if (!isHidrogeologiOpen) {
      isHidrologiOpen = false;
      isHidrometeorologiOpen = false;
      isInformasiOpen = false;
    }
    isHidrogeologiOpen = !isHidrogeologiOpen;
  }

  // Toggle function for 'INFORMASI' dropdown
  function toggleInformasi() {
    if (!isInformasiOpen) {
      isHidrologiOpen = false;
      isHidrometeorologiOpen = false;
      isHidrogeologiOpen = false;
    }
    isInformasiOpen = !isInformasiOpen;
  }

  // Navigate and closeAllSubmenus
  function navigateAndClose() {
    isMenuOpen = false;
    closeAllSubmenus();
  }
</script>

<header class="bg-gray-800/50 text-white p-4 relative z-50"> <div class="container mx-auto flex justify-between items-center">
    <a href="/"><h1 class="text-xl font-bold">BBWS Citanduy</h1></a>

    <button
      class="text-white focus:outline-none relative z-50"
      on:click={toggleMenu}
      aria-label="Toggle navigation menu"
    >
      <svg
        class="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        ></path>
      </svg>
    </button>

    <nav
      class="
        fixed top-0 right-0
        h-full
        bg-[oklch(37.9%_0.146_265.522)]
        text-white
        flex flex-col
        pt-16 px-6
        transition-all duration-300 ease-in-out
        transform origin-top-right
        z-40
        {isMenuOpen ? 'translate-x-0 w-max' : 'translate-x-full w-max'}
        md:w-auto md:max-w-md
      "
    >
      <ul class="flex flex-col space-y-2 flex-grow">

        <li class="group">
          <button
            on:click={toggleHidrologi}
            class="flex items-center justify-between w-full p-2 text-left focus:outline-none hover:bg-blue-600 uppercase"
          >
            HIDROLOGI
            <span class="ml-2 transform transition-transform duration-200"
                  class:rotate-90={isHidrologiOpen}>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>
          <ul
            class="
              pl-4 mt-2
              bg-[oklch(37.9%_0.146_265.522)]
              text-white
              transition-all duration-300 ease-in-out overflow-hidden
              {isHidrologiOpen ? 'max-h-screen' : 'max-h-0'}
            "
          >
            <li><a href="/h1/hujan" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>INFORMASI CURAH HUJAN</a></li>
            <li><a href="/h1/tma" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>INFORMASI TINGGI MUKA AIR</a></li>
            <li><a href="/h1/ka" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>INFORMASI KUALITAS AIR</a></li>
          </ul>
        </li>

        <li class="group">
          <button
            on:click={toggleHidrometeorologi}
            class="flex items-center justify-between w-full p-2 text-left focus:outline-none hover:bg-blue-600 uppercase"
          >
            HIDROMETEOROLOGI
            <span class="ml-2 transform transition-transform duration-200"
                  class:rotate-90={isHidrometeorologiOpen}>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>
          <ul
            class="
              pl-4 mt-2
              bg-[oklch(37.9%_0.146_265.522)]
              text-white
              transition-all duration-300 ease-in-out overflow-hidden
              {isHidrometeorologiOpen ? 'max-h-screen' : 'max-h-0'}
            "
          >
            <li><a href="/h2/cuaca" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>INFORMASI IKLIM DAN CUACA</a></li>
          </ul>
        </li>

        <li class="group">
          <button
            on:click={toggleHidrogeologi}
            class="flex items-center justify-between w-full p-2 text-left focus:outline-none hover:bg-blue-600 uppercase"
          >
            HIDROGEOLOGI
            <span class="ml-2 transform transition-transform duration-200"
                  class:rotate-90={isHidrogeologiOpen}>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>
          <ul
            class="
              pl-4 mt-2
              bg-[oklch(37.9%_0.146_265.522)]
              text-white
              transition-all duration-300 ease-in-out overflow-hidden
              {isHidrogeologiOpen ? 'max-h-screen' : 'max-h-0'}
            "
          >
            <li><a href="/h3/mat" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>INFORMASI MUKA AIR TANAH</a></li>
            <li><a href="/h3/sp" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>SUMUR PANTAU</a></li>
          </ul>
        </li>

        <li class="group">
          <button
            on:click={toggleInformasi}
            class="flex items-center justify-between w-full p-2 text-left focus:outline-none hover:bg-blue-600 uppercase"
          >
            INFORMASI
            <span class="ml-2 transform transition-transform duration-200"
                  class:rotate-90={isInformasiOpen}>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>
          <ul
            class="
              pl-4 mt-2
              bg-[oklch(37.9%_0.146_265.522)]
              text-white
              transition-all duration-300 ease-in-out overflow-hidden
              {isInformasiOpen ? 'max-h-screen' : 'max-h-0'}
            "
          >
            <li><a href="/informasi/berita" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>BERITA / PENGUMUMAN</a></li>
            <li><a href="/informasi/ews" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>EARLY WARNING SYSTEM</a></li>
            <li><a href="/informasi/hubungi_kami" class="block px-4 py-2 hover:bg-blue-600" on:click={navigateAndClose}>HUBUNGI KAMI</a></li>
          </ul>
        </li>

      </ul>

      <div class="mt-auto flex justify-between items-center p-4 border-t border-blue-700">
        <div class="text-sm">
          <img src="/img/cty-logo-gray.png" alt="CTY Logo" class="h-8 mr-2 inline-block">
        </div>
        <div>
          <a href="#" class="text-white hover:text-blue-200">Login</a>
        </div>
      </div>
    </nav>
  </div>
</header>