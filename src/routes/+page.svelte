<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex justify-center items-center min-h-screen bg-gray-900">
  <button class="
    bg-transparent          /* Makes the background transparent */
    border                  /* Adds a border */
    border-white            /* Sets the border color to white */
    text-white              /* Sets the text color to white so it's visible */
    rounded-full            /* Makes the border fully rounded (pill shape) */
    px-8 py-3               /* Adds horizontal (x) and vertical (y) padding */
    font-semibold           /* Makes the text bold */
    transition-colors duration-300 /* Smooth transition for hover effects */
    hover:bg-white          /* Optional: background turns white on hover */
    hover:text-gray-900     /* Optional: text turns dark on hover */
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 /* Optional: focus ring for accessibility */
  ">
    Geospatial
  </button>
</section>