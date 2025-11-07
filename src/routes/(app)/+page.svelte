<script lang="ts">
  import type { PageProps } from './$types';
  import { ArrowUpRightFromSquareOutline, ArrowDownOutline, ArrowUpOutline, DrawSquareOutline } from 'flowbite-svelte-icons';
  import TruncatedText  from '$lib/components/TruncatedText.svelte';
  import Rain from '$lib/components/Rain.svelte';
  import RiverWaterLevel from '$lib/components/RiverWaterLevel.svelte';
  import Mitra from '$lib/components/Mitra.svelte';
  import { Button } from 'flowbite-svelte';
  let { data }: PageProps = $props();
  let news_index = Math.floor(Math.random() * 5);

  // peta cadangan air tanah
    import { onMount } from 'svelte';
    import('leaflet/dist/leaflet.css');

  let mapContainer;
  let dasLayer: L.GeoJSON;
  let catJabar: L.GeoJSON;
  let catJateng: L.GeoJSON;

  onMount(async () => {
    // Prevent code from running on the server
    if (typeof window === 'undefined') return;

    // Import Leaflet dynamically only in the browser
    const L = await import('leaflet');

    const map = L.map(mapContainer).setView([-7.35, 108.22], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    dasLayer = L.geoJSON(data.das_cty, {
      style: {
        color: '#dd0000',
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.01,
      },
    }).addTo(map);

    catJabar = L.geoJSON(data.cat_jabar, {
      style: {
        color: '#009900',
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.4,
      },

    }).addTo(map);

    catJateng = L.geoJSON(data.cat_jateng, {
      style: {
        color: '#000099',
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.4,
      },

    }).addTo(map);

    L.circleMarker([-7.546522222, 108.3791056], 
                                    {  radius: 6,
                                color: '#aa0000',
                                fillColor: 'red',
                                fillOpacity: 0.8,
                                weight: 2}

    )
      .addTo(map)
      .bindPopup(`<div style="padding:4px; min-width:220px;">
                    <h4 style="margin:0 0 8px 0; color:#FF851B;">HidroGeologi</h4>
                    <div style="font-weight:bold; margin-bottom:6px;">Sumur Pantau</div>
                    <div style="font-size:0.95em; color:#555;">
                        <span>UPTD PSDA WS Citanduy, Dinas SDA Provinsi Jawa Barat (DISTAM-JB)</span><br>
                    </div>
                </div>`);
      L.circleMarker([-7.341769444, 108.2153861], {  
        radius: 6,
        color: '#aa0000',
        fillColor: 'red',
        fillOpacity: 0.8,
        weight: 2})
        .addTo(map)
        .bindPopup(`<div style="padding:4px; min-width:220px;">
                      <h4 style="margin:0 0 8px 0; color:#FF851B;">HidroGeologi</h4>
                      <div style="font-weight:bold; margin-bottom:6px;">Sumur Pantau</div>
                      <div style="font-size:0.95em; color:#555;">
                          <span>PT. Asia San Prima</span><br>
                      </div>
                  </div>`);
      L.circleMarker([-7.709609, 109.01053], {  
        radius: 6,
        color: '#aa0000',
        fillColor: 'red',
        fillOpacity: 0.8,
        weight: 2})
        .addTo(map)
        .bindPopup(`<div style="padding:4px; min-width:220px;">
                      <h4 style="margin:0 0 8px 0; color:#FF851B;">HidroGeologi</h4>
                      <div style="font-weight:bold; margin-bottom:6px;">Sumur Pantau Air Tanah ESDM Jawa Tengah</div>
                      <div style="font-size:0.95em; color:#555;">
                          <span>PT. Pertamina, Cilacap</span><br>
                      </div>
                  </div>`);

      L.circleMarker([-7.44823, 108.9241], {  
        radius: 6,
        color: '#aa0000',
        fillColor: 'red',
        fillOpacity: 0.8,
        weight: 2})
        .addTo(map)
        .bindPopup(`<div style="padding:4px; min-width:220px;">
                      <h4 style="margin:0 0 8px 0; color:#FF851B;">HidroGeologi</h4>
                      <div style="font-weight:bold; margin-bottom:6px;">Sumur Pantau Air Tanah ESDM Jawa Tengah</div>
                      <div style="font-size:0.95em; color:#555;">
                          <span>Jalan Karangpucung, Lumbir</span><br>
                      </div>
                  </div>`);
    
    if (dasLayer.getBounds().isValid()) {
      map.fitBounds(dasLayer.getBounds());
    }
    addLegend(map);
    return () => {
      if (map) {
        map.remove();
      }
    };
  });

function addLegend(map: L.Map) {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend custom-legend');
    div.style.backgroundColor = 'white';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';

    const legendItems = [
      {
        label: 'Batas DAS',
        icon: 'line',
        color: '#dd0000',
        width: 20,
        height: 2
      },
      {
        label: 'Sumur Pantau',
        icon: 'circle',
        color: 'red',
        border: '#aa0000',
        size: 12
      },
      {
        label: 'Cadangan Air Tanah Jabar',
        icon: 'line',
        color: '#00dd00',
        width: 20,
        height: 2
      },
      {
        label: 'Cadangan Air Tanah Jateng',
        icon: 'line',
        color: '#000099',
        width: 20,
        height: 2
      }
    ];

    let html = `
      <div class="legend-header" style="margin-bottom: 14px;">
        <h4>LEGENDA</h4>
      </div>
      <div class="legend-items">
    `;

    legendItems.forEach(item => {
      if (item.icon === 'line') {
        html += `
          <div class="legend-item" style="padding-bottom:12px;">
            <div class="legend-icon line" style="background-color: ${item.color}; width: ${item.width}px; height: ${item.height}px;"></div>
            <span class="legend-label">${item.label}</span>
          </div>
        `;
      } else if (item.icon === 'circle') {
        html += `
          <div class="legend-item">
            <div class="legend-icon circle" style="border-radius: 50%;background-color: ${item.color}; border: 2px solid ${item.border}; width: ${item.size}px; height: ${item.size}px;"></div>
            <span class="legend-label">${item.label}</span>
          </div>
        `;
      } else if (item.icon === 'pattern') {
        html += `
          <div class="legend-item">
            <div class="legend-icon pattern" style="background: ${item.pattern}; width: ${item.width}px; height: ${item.height}px;"></div>
            <span class="legend-label">${item.label}</span>
          </div>
        `;
      }
    });

    html += '</div>';
    div.innerHTML = html;
    
    return div;
  };

  legend.addTo(map);
}
</script>

<style>

  /** Legenda */
  .custom-legend {
    background: white !important;
    padding: 12px !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .legend-header h4 {
    margin: 0 0 12px 0;
    padding: 0;
    border-bottom: 2px solid #e0e0e0;
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    text-align: center;
  }

  .legend-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .legend-icon {
    flex-shrink: 0;
  }

  .legend-icon.line {
    border-radius: 1px;
  }

  .legend-icon.circle {
    border-radius: 50%;
  }

  .legend-icon.pattern {
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .legend-label {
    font-size: 11px;
    color: #555;
    font-weight: 500;
  }
</style>
<svelte:head>
  <title>SIH3 WS Citanduy</title>
  <meta name="description" content="Sistem Informasi Hidro Meteorologi, Hidrologi dan Hidro Geologi Resmi Wilayah Sungai Citanduy" />
</svelte:head>

<section
  id="hero"
  class="border border-gray-200 relative overflow-hidden"
  style="background-image: url('/img/manganti.webp'); background-size: cover; background-position: center; padding-top: 33.33%;"
>
  <div class="absolute inset-0 flex flex-col md:flex-row gap-4 items-center pb-5">
    <div class="w-full text-center">
      <p class="text-2xl font-bold md:text-6xl md:font-black text-shadow-lg/30 text-white my-4">Sistem Informasi<br>Hidrologi, Hidrometeorologi dan Hidrogeologi</p>
  </div>
  </div>
  <div class="flex items-center justify-center">
  <div>
    
  </div>
</div>
  <div class="text-center border-t-2 border-t-gray-400 border-b-1 border-b-gray-400 py-2">
    <p class=" backdrop-blur-sm">
      <span class="me-3 mt-5 bg-gray-800 rounded-md text-white text-xs p-1">BERITA TERBARU</span>
    <a class="me-5 text-white" href="https://sda.pu.go.id/balai/bbwscitanduy/{data.berita[news_index]?.href}">{data.berita[news_index]?.title}</a> &dash; <a href="#berita" class="ms-3 italic text-white">berita lain...</a>
  </p>
  </div>
</section>
<section id="meteorologi" class="py-5 mt-9">
  <div class="text-center my-5 pb-5">
  <h2 class="text-4xl mt-5 font-bold">
    Prakiraan Cuaca
  </h2>
  <p class="text-gray-500">sumber: <a href="https://www.bmkg.go.id">https://www.bmkg.go.id <ArrowUpRightFromSquareOutline class="inline" /></a></p>
  </div>

<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
  {#each data.prakiraanList as item}
  <div class="bg-white shadow-sm rounded-sm p-2 border border-gray-300">
    <a href="https://www.bmkg.go.id{item.href}"><h3 class="text-md text-center text-gray-800 mb-2 md:tracking-wide">{item.city} <ArrowUpRightFromSquareOutline class="inline" size="sm" /></h3></a>
    <div class="flex flex-row justify-between gap-2">
      <!-- Today -->
      <div class="flex-1 p-0 rounded-sm">
        <p class="text-xs text-gray-500">Hari ini </p>
        <p class="text-center"><b>{item.hari_1.tanggal.slice(5)}</b></p>
        <p class="flex items-center gap-2 text-gray-700 mt-2">
          {@html item.hari_1.cuaca_icon}
        </p>
        <p class="text-xs  text-gray-500">{item.hari_1.cuaca}</p>
      </div>

      <!-- Tomorrow -->
      <div class="flex-1 ps-2 rounded-sm border-s-2 border-s-gray-100">
        <p class="text-xs  text-gray-500">Besok</p>
        <p class="text-center"><b>{item.hari_2.tanggal.slice(5)}</b></p>
        <p class="flex items-center gap-2 text-gray-700 mt-2">
          {@html item.hari_2.cuaca_icon}
        </p>
        <p class="text-xs  text-gray-500">{item.hari_2.cuaca}</p>
      </div>
    </div>
    </div>
  {/each}
  </div>
</section>

<section id="hidrologi" class="mt-10 border-t border-t-gray-200">
<div class="py-5 mt-5">
  <div class="text-center my-5 pb-5">
    <h2 class="text-4xl font-bold">Hujan &amp; Muka Air Sungai</h2>
    <p class="text-gray-500">sumber: <a href="https://sihka.bbwscitanduy.id">https://sihka.bbwscitanduy.id <ArrowUpRightFromSquareOutline class="inline" /></a></p>
  </div>
  <Rain {...data} />
</div>
<div>
  <RiverWaterLevel {...data} />
</div>
</section>

<section id="hidrogeologi" class="mt-10 border-t border-t-gray-200">
<div class="py-5 mt-5">
  <div class="text-center my-5 pb-5">
    <h2 class="text-4xl font-bold my-5">Sumur Pantau &amp; Cadangan Air Tanah</h2>
    <p class="text-gray-500">sumber: <a href="https://geologi.esdm.go.id/patgtl">Badan Geologi: Pusat Air Tanah dan Geologi Tata Lingkungan<ArrowUpRightFromSquareOutline class="inline" /></a></p>
  </div>
</div>
  <div bind:this={mapContainer} class="w-full h-[400px] max-w-screen-lg mx-auto rounded shadow"></div>
</section>

<section id="berita" class="mt-10 border-t border-t-gray-200">
  <div class="text-center my-5 mb-9">
    <h2 class="text-4xl font-bold mt-5 my-5">Berita Kegiatan</h2>
  </div>
    <ul class="list-disc ms-5">
    {#each data.berita as item}
      <li class="pb-3"><a href="https://sda.pu.go.id/balai/bbwscitanduy/{item.href}" title="{item.title}"><TruncatedText text={item.title} /></a></li>
    {/each}
    </ul>
</section>
<section id="mitra" class="mt-10 border-t border-t-gray-200">
  <Mitra />
</section>