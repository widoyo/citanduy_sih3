<script lang="ts">
  import type { PageProps } from './$types';
  import { ArrowUpRightFromSquareOutline, ArrowDownOutline, ArrowUpOutline } from 'flowbite-svelte-icons';
  import TruncatedText  from '$lib/components/TruncatedText.svelte';
  import { Button } from 'flowbite-svelte';
  let { data }: PageProps = $props();
  let news_index = Math.floor(Math.random() * 5);

  // peta cadangan air tanah
    import { onMount } from 'svelte';
    import('leaflet/dist/leaflet.css');

  let mapContainer;

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

    L.marker([-7.35, 108.22])
      .addTo(map)
      .bindPopup('Contoh Sumur Pantau')
      .openPopup();
  });
</script>

<style>
  #hidrogeologi .leaflet-container {
  width: 100%;
  height: 100%;
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
      <p class="text-4xl text-shadow-lg/30 text-white my-4 font-light">Sistem Informasi<br>Hidrologi, Hidrometeorologi dan Hidrogeologi</p>
  </div>
  </div>
  <div class="flex items-center justify-center">
  <div>
    
  </div>
</div>
  <div class="text-center border-t-2 border-t-gray-400 border-b-1 border-b-gray-400 py-2">
    <p class=" backdrop-blur-sm">
      <span class="me-3 mt-5 bg-gray-400 text-white text-xs p-1">BERITA TERBARU</span>
    <a class="me-5 text-white" href="https://sda.pu.go.id/balai/bbwscitanduy/{data.berita[news_index].a_href}">{data.berita[news_index].a_title}</a> &dash; <a href="#berita" class="ms-3 italic text-white">berita lain...</a>
  </p>
  </div>
</section>
<section id="meteorologi" class="py-5 mt-9">
  <div class="text-center my-5 pb-5">
  <h2 class="text-3xl font-bold mt-5 md:tracking-widest">
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
    <h2 class="text-3xl font-bold md:tracking-widest">Hujan &amp; Muka Air Sungai</h2>
    <p class="text-gray-500">sumber: <a href="https://sihka.bbwscitanduy.id">https://sihka.bbwscitanduy.id <ArrowUpRightFromSquareOutline class="inline" /></a></p>
  </div>
  <h3 class="text-2xl mt-10 mb-5"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-rain" viewBox="0 0 16 16">
  <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>
</svg>
Hujan</h3>
  {#if data.rainData.length > 0}
    <p class="text-sm text-gray-500">Hujan terjadi hari ini di <b>{data.rainData.length}</b> lokasi dari <b>51</b> Pos Hujan</p>
  {:else}
    <p class="text-sm text-gray-500">Tidak ada hujan hari ini.</p>
  {/if}
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
  {#if data.rainData.length > 0}
  {#each data.groupedRainData as group}
  <div>
    <h2 class="text-xl font-bold">{group.label}</h2>
    <ul>
      {#each group.items as item}
        <li>{item.pos.nama}: {item.telemetri.rain24.toFixed(1)} mm</li>
      {/each}
    </ul>
  </div>
  {/each}
  {/if}
</div>
<div>

  <h3 class="text-2xl mt-10 mb-5">Tinggi Muka Air Sungai</h3>
  <p class="text-sm mb-3 text-gray-500">T15: tren 15 menit lalu, T60: tren 60 menit lalu</p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
    {#each data.groupedWLevelData as group}
    <div class="border border-gray-200 rounded-sm p-2 mb-2">
    <h2 class="text-lg/5 font-bold mb-3"><small class="text-gray-500 font-light">sungai</small><br>
      {group.sungai} <small class="text-gray-500 font-light">{group.items.length} Pos Duga Air</small></h2>
    <ol class="list-decimal ms-4">
      {#each group.items as item}
        <li>
          {item.pos.nama} <small class="font-light text-gray-500">+{item.pos.elevasi} mdpl</small><br>
          <small class="font-light text-gray-500">TMA:</small> {((item.telemetri.wlevel?) / 100).toFixed(1)} m, 
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
  <div class="text-center">
    <h2 class="text-3xl font-bold my-5 md:tracking-widest">Air Tanah</h2>
  </div>
</div>
  <div bind:this={mapContainer} class="w-full h-[400px] max-w-screen-lg mx-auto rounded shadow"></div>
</section>

<section id="berita" class="mt-10 border-t border-t-gray-200">
  <div class="text-center mb-9">
    <h2 class="text-3xl font-bold my-5">Berita Kegiatan</h2>
  </div>
    <ul class="list-disc ms-5">
    {#each data.berita as item}
      <li class="pb-3"><a href="https://sda.pu.go.id/balai/bbwscitanduy/{item.a_href}" title="{item.a_title}"><TruncatedText text={item.a_title} /></a></li>
    {/each}
    </ul>
</section>
<section id="mitra" class="mt-10 border-t border-t-gray-200">
  <div class="text-center mb-9">
    <h2 class="text-3xl font-bold my-5">Mitra Kerja</h2>
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
      <p class="text-xs pt-3">Badan Pengelola Daerah Aliran Sungai Hutan Lindung Cimanuk Citanduy <a href="https://www.instagram.com/bpdas_cimanukcitanduy/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
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