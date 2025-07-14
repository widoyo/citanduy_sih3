<script lang="ts">
  import type { PageProps } from './$types';
  import { ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<section id="hero">
  <div class="flex flex-col md:flex-row gap-4 items-center pb-5 border-b-2 border-b-gray-200">
    <div class="w-full md:w-1/2">
      <h1 class="text-6xl text-gray-600 font-bold my-5 tracking-widest">SIH3</h1>
      <p class="text-4xl text-gray-400 my-4 font-light">Sistem Informasi<br>Hidro&nbsp;Meteorologi, Hidrologi dan Hidro&nbsp;Geologi</p>
      <p class="text-5xl text-gray-600 mt-5"><img src="/img/logo-pupr.png" alt="" class="inline me-3 pb-2">BBWS Citanduy</p>
    </div>
    <div class="w-full md:w-1/2 items-center flex justify-center">
      <img src="/img/logo_h3.png" alt="logo" class="" />
      {#each data.beritaTitle as item}
      <p>{item}</p>
      {/each}
    </div>
  </div>
</section>
<section id="meteorologi" class="py-5 mt-9">
  <div class="text-center my-5">
  <h2 class="text-3xl font-bold mt-5 md:tracking-widest">
    METEOROLOGI
  </h2>
  <p class="text-gray-500">sumber: <a href="https://www.bmkg.go.id">https://www.bmkg.go.id <ArrowUpRightFromSquareOutline class="inline" /></a></p>
  </div>

<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
  {#each data.prakiraanList as item}
  <div class="max-w mx-auto bg-white shadow-sm rounded-sm p-2 border border-gray-300">
    <a href="https://www.bmkg.go.id{item.href}"><h3 class="text-md text-center text-gray-800 mb-2 md:tracking-wide">{item.city} <ArrowUpRightFromSquareOutline class="inline" size="sm" /></h3></a>
    <div class="flex flex-col md:flex-row justify-between gap-2">
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

<section id="hidrologi">
<div class="py-5 mt-5">
  <div class="text-center">
    <h2 class="text-3xl font-bold my-5">HIDROLOGI</h2>
  </div>
  Hujan yang terjadi di wilayah Jawa Barat dan sebagian Jawa Tengah
</div>
<div>
  Tinggi Muka Air
  Cendrung Naik | Datar | Cendrung Turun
</div>
</section>

<section id="mitra">
  <div class="text-center">
    <h2 class="text-3xl font-bold my-5">Mitra Kerja</h2>
  </div>
</section>