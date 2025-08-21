<script lang="ts">
  import type { PageProps } from './$types';
  import { ArrowUpRightFromSquareOutline, ArrowDownOutline, ArrowUpOutline, DrawSquareOutline } from 'flowbite-svelte-icons';
  import TruncatedText  from '$lib/components/TruncatedText.svelte';
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
  .masonry-grid {
    column-count: 1; /* Default untuk mobile */
    column-gap: 1rem; /* Sama dengan gap-4 di Tailwind */
  }

  @media (min-width: 768px) { /* md breakpoint */
    .masonry-grid {
      column-count: 2;
    }
  }

  @media (min-width: 1024px) { /* lg breakpoint */
    .masonry-grid {
      column-count: 3;
    }
  }

  .masonry-grid > div {
    break-inside: avoid-column; /* Penting untuk mencegah kartu terpotong */
    margin-bottom: 1rem;
  }

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
      <p class="text-4xl text-shadow-lg/30 text-white my-4">Sistem Informasi<br>Hidrologi, Hidrometeorologi dan Hidrogeologi</p>
  </div>
  </div>
  <div class="flex items-center justify-center">
  <div>
    
  </div>
</div>
  <div class="text-center border-t-2 border-t-gray-400 border-b-1 border-b-gray-400 py-2">
    <p class=" backdrop-blur-sm">
      <span class="me-3 mt-5 bg-gray-800 rounded-md text-white text-xs p-1">BERITA TERBARU</span>
    <a class="me-5 text-white" href="https://sda.pu.go.id/balai/bbwscitanduy/{data.berita[news_index].href}">{data.berita[news_index].title}</a> &dash; <a href="#berita" class="ms-3 italic text-white">berita lain...</a>
  </p>
  </div>
</section>
<section id="meteorologi" class="py-5 mt-9">
  <div class="text-center my-5 pb-5">
  <h2 class="text-3xl mt-5 md:tracking-widest">
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
    <h2 class="text-3xl md:tracking-widest">Hujan &amp; Muka Air Sungai</h2>
    <p class="text-gray-500">sumber: <a href="https://sihka.bbwscitanduy.id">https://sihka.bbwscitanduy.id <ArrowUpRightFromSquareOutline class="inline" /></a></p>
  </div>
  <h3 class="text-2xl mt-10 mb-5">Hujan</h3>
  {#if data.rainData.length > 0}
    <p class="text-sm text-gray-500">Hujan terjadi hari ini di <b>{data.rainData.length}</b> lokasi dari <b>51</b> Pos Hujan</p>
  {:else}
    <p class="text-sm text-gray-500">Tidak ada hujan hari ini.</p>
  {/if}
  <div class="masonry-grid">
  {#if data.rainData.length > 0}
  {#each data.groupedRainData as group}
  <div class="mb-5" style="margin-bottom: 3rem;">
    <h2 class="text-xl font-bold border-b-2 pb-1">{group.label} 
      <span class="ms-2 font-light text-xs text-gray-500">HUJAN</span> <span class="font-light">{group.items.reduce( (acc, item) => acc + item.telemetri.rain24, 0).toFixed(1)}</span> <span class="font-light text-xs text-gray-500">mm</span></h2>
    <ul class="mt-3">
      {#each group.items as item}
        <li class="grid grid-cols-2 gap-2">
          <span>{item.pos.nama.replace('PCH ', '')}</span> 
          <span class="text-right">{item.telemetri.rain24.toFixed(1)} <span class="font-light text-xs text-gray-500">mm</span></span></li>
      {/each}
    </ul>
  </div>
  {/each}
  {/if}
</div>
<div>

  <h3 class="text-2xl mt-10 mb-5">Tinggi Muka Air Sungai</h3>
  <p class="text-sm mb-3 text-gray-500">T15: thd 15 menit lalu, T60: thd 60 menit lalu</p>
  <div class="masonry-grid">
    {#each data.groupedWLevelData as group}
    <div class="border border-gray-200 rounded-sm p-2 shadow-xs">
    <h2 class="text-lg/5 font-bold mb-3"><small class="text-gray-500 font-light">sungai</small><br>
      {group.sungai}</h2>
    <ol class="list-decimal ms-4">
      {#each group.items as item}
        <li class="mb-6">
          {item.pos.nama} <small class="font-light text-gray-500"><b class="font-bold">+{item.pos.elevasi}</b> mdpl</small><br>
          {#if item.pos.kabupaten}<small class="font-light ">ds {item.pos.desa}, kec. {item.pos.kecamatan}, kab. {item.pos.kabupaten}</small><br>{/if}
          {#if item.pos.sh }
          <small class="font-light text-gray-500">SIAGA</small> <span class="text-xs text-white bg-green-700 rounded-xs px-1">{(item.pos.sh/100).toFixed(1)}</span> <span class="text-xs text-gray bg-yellow-500 rounded-xs px-1">{(item.pos.sk / 100).toFixed(1)}</span> <span class="text-xs text-white bg-red-700 rounded-xs px-1">{(item.pos.sm / 100).toFixed(1)}</span><br>
          {/if}
          <small class="font-light text-gray-500" title="{item.telemetri.sampling}">TMA</small> {((item.telemetri.wlevel?) / 100).toFixed(1)} m, 
          <small class="font-light text-gray-500">T60</small> 
          {#if item.telemetri.trend.t_60_min.trend === 'naik'}<ArrowUpOutline class="inline w-4 h-4 text-red-500"/>
          {:else if item.telemetri.trend.t_60_min.trend === 'turun'}<ArrowDownOutline class="inline w-4 h-4 text-green-500" />
          {:else}-{/if}
          <small class="font-light text-gray-500">T15</small> 
          {#if item.telemetri.trend.t_15_min.trend === 'naik'}<ArrowUpOutline class="inline w-4 h-4 text-red-500"/>
          {:else if item.telemetri.trend.t_15_min.trend === 'turun'}<ArrowDownOutline class="inline w-4 h-4 text-green-500" />
          {:else}-{/if}
        </li>
      {/each}
    </ol>
    </div>
    {/each} 
  </div>
</div>
</section>

<section id="hidrogeologi" class="mt-10 border-t border-t-gray-200">
<div class="py-5 mt-5">
  <div class="text-center my-5 pb-5">
    <h2 class="text-3xl my-5 md:tracking-widest">Sumur Pantau &amp; Cadangan Air Tanah</h2>
    <p class="text-gray-500">sumber: <a href="https://geologi.esdm.go.id/patgtl">Badan Geologi: Pusat Air Tanah dan Geologi Tata Lingkungan<ArrowUpRightFromSquareOutline class="inline" /></a></p>
  </div>
</div>
  <div bind:this={mapContainer} class="w-full h-[400px] max-w-screen-lg mx-auto rounded shadow"></div>
</section>

<section id="berita" class="mt-10 border-t border-t-gray-200">
  <div class="text-center mb-9">
    <h2 class="text-3xl my-5 md:tracking-widest">Berita Kegiatan</h2>
  </div>
    <ul class="list-disc ms-5">
    {#each data.berita as item}
      <li class="pb-3"><a href="https://sda.pu.go.id/balai/bbwscitanduy/{item.href}" title="{item.title}"><TruncatedText text={item.title} /></a></li>
    {/each}
    </ul>
</section>
<section id="mitra" class="mt-10 border-t border-t-gray-200">
  <div class="text-center mb-9">
    <h2 class="text-3xl my-5 md:tracking-widest">Mitra Kerja</h2>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
    <div class="">
      <img src="/img/bmkg_logo.png" width="70" alt="Stasiun Klimatologi Jawa Barat">
      <p class="text-xs pt-3">
        Stasiun Klimatologi Kelas 1 Jawa Barat <a href="https://staklimjabar.id/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a>
      </p>
    </div>

    <div class="">
      <img src="/img/bmkg_logo.png" width="70" alt="Stasiun Klimatologi Jawa Tengah">
      <p class="text-xs pt-3">Stasiun Klimatologi Kelas 1 Jawa Tengah <a href="https://iklimjateng.info/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div>
      <img src="https://d2s1u1uyrl4yfi.cloudfront.net/dinassda/post/0e93917bd4ef28a9ea5da93da3b32925.png" alt="Dinas Sumber Daya Air Provinsi Jawa Barat">
      <p class="text-xs pt-3">Dinas Sumber Daya Air Provinsi Jawa Barat <a href="https://dsda.jabarprov.go.id/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div>
      <img src="/img/pusdataru_logo.jpeg" width="80" alt="Dinas Sumber Daya Air Provinsi Jawa Tengah">
      <p class="text-xs pt-3">Dinas Sumber Daya Air Provinsi Jawa Tengah <a href="https://pusdataru.jatengprov.go.id/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div class="">
      <div class="bg-green-600 p-3 rounded-sm">
      <img src="https://d2s1u1uyrl4yfi.cloudfront.net/dlh/logo/db4f7efb8a70794e1f8b54cac83dbdda.png" alt="Dinas Lingkungan Hidup Provinsi Jawa Barat">
      </div>
      <p class="text-xs pt-3">Dinas Lingkungan Hidup Provinsi Jawa Barat <a href="https://dlh.jabarprov.go.id/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div class="">
      <img src="/img/jateng_logo.png" width="80" alt="Dinas Lingkungan Hidup Jawa Tengah">
      <p class="text-xs pt-3">Dinas Lingkungan Hidup dan Kehutanan Jawa Tengah  <a href="https://dlhk.jatengprov.go.id"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div class="">
      <img src="/img/bpdas_cimata.png" alt="Badan Pengelola DAS Cimanuk Cisanggarung">
      <p class="text-xs pt-3">Badan Pengelola Daerah Aliran Sungai Cimanuk Citanduy <a href="https://www.instagram.com/bpdas_cimanukcitanduy/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div>
      <img src="/img/geologi_logo.png" width="80" alt="PATGTL Badan Geologi">
      <p class="text-xs pt-3">Badan Geologi Pusat Air Tanah dan Geologi Tata Lingkungan  <a href="https://geologi.esdm.go.id/patgtl"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div>
      <div class="bg-blue-950 p-3 rounded-sm">
      <img src="https://d2s1u1uyrl4yfi.cloudfront.net/esdm/logo/b077949c9613ab40c8655893401dde0d.png" alt="Dinas Energi dan Sumber Daya Mineral Provinsi Jawa Barat">
      </div>
      <p class="text-xs pt-3">Dinas Energi dan Sumber Daya Mineral Jawa Barat  <a href="https://esdm.jabarprov.go.id/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div>
      <img src="/img/jateng_logo.png" width="80" alt="Dinas Energi dan Sumber Daya Mineral Jawa Tengah">
      <p class="text-xs pt-3">Dinas Energi dan Sumber Daya Mineral Jawa Tengah <a href="https://esdm.jatengprov.go.id/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div>
      <img src="/img/cty-logo.png" width="100" alt="Balai Besar Wilayah Sungai Citanduy">
      <p class="text-xs pt-3">Balai Besar Wilayah Sungai Citanduy <a href="https://sda.pu.go.id/balai/bbwscitanduy"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>
  </div>
</section>