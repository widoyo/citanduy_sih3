<script lang="ts">
  import "../../app.css";
  import { onMount } from 'svelte';
  import HeaderNav  from "$lib/components/HeaderNav.svelte";

  let map;

  onMount(() => {
    // Ensure Leaflet CSS is loaded
    import('leaflet/dist/leaflet.css');
    import('leaflet').then(L => {
      map = L.map('map').setView([-7.3518, 108.2208], 10); // Center to Citanduy

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Example marker
      L.marker([-7.3518, 108.2208])
        .addTo(map)
        .bindPopup('Citanduy Region')
        .openPopup();
    });
  });
</script>

<style>
  :global(html), :global(body), #map {
    height: 100%;
    margin: 0;
    margin-top: 40px;
    padding: 0;
  }

  #map {
    width: 100%;
    border: none;
  }
</style>

 <svelte:head>
  <title>Geospatial H3 Wilayah Sungai Citanduy</title>
  <meta name="description" content="Content geografis Resmi H3 Wilayah Sungai Citanduy" />
</svelte:head>

<HeaderNav />
<div id="map"></div>