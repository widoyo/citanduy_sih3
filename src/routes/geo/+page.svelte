<script lang="ts">
  import "../../app.css";
  import type { PageProps } from './$types';
  import { onMount } from 'svelte';
  import HeaderNav  from "$lib/components/HeaderNav.svelte";
  let { data }: PageProps = $props();
  let map;

  onMount(() => {
    // Ensure Leaflet CSS is loaded
    import('leaflet/dist/leaflet.css');
    import('leaflet').then(L => {
      map = L.map('map').setView([-7.3518, 108.2208], 10); // Center to Citanduy

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const optCircle = {
                          radius: 6,
                          color: '#0074D9',
                          fillColor: '#0074D9',
                          fillOpacity: 0.8,
                          weight: 2
                      }
      data.posCty.forEach((pos: any) => {
        console.log('Adding marker for:', pos.nama, pos.longitude);
        if (pos.latitude, pos.longitude) {
          if (pos.tipe === "2") {
            // If it's a river gauge, use a different style
            optCircle.color = '#FF4136';
            optCircle.fillColor = '#FF4136';
          } else if (pos.tipe === "1") {
            // If it's a rainfall gauge, use another style
            optCircle.color = '#0074D9';
            optCircle.fillColor = '#0074D9';
          } else {
            // Default style for other types
            optCircle.color = '#0074D9';
            optCircle.fillColor = '#0074D9';
          }
          L.circleMarker([pos.latitude, pos.longitude], optCircle)
            .addTo(map)
            .bindPopup(`<div style="padding:4px; min-width:220px;">
                                <h4 style="margin:0 0 8px 0; color:#FF851B;">Pos Hidrologi</h4>
                                <div style="font-weight:bold; margin-bottom:6px;">${pos.nama} <span style="margin: 4px 0 0;font-weight:500;color:#888">+${pos.elevasi} <span style="font-size: 11px;font-weight:500;letter-spacing:0.1rem;color:#888">MDPL</span></div>
`);
        }
      });
    });
  });
</script>

<style>
  :global(html), :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #map {
    position: fixed;
    top: 92px; /* Adjust to match your navbar height */
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    border: none;
    z-index: 0;
  }
</style>

 <svelte:head>
  <title>Geospatial H3 Wilayah Sungai Citanduy</title>
  <meta name="description" content="Content geografis Resmi H3 Wilayah Sungai Citanduy" />
</svelte:head>

<HeaderNav />
<div id="map"></div>