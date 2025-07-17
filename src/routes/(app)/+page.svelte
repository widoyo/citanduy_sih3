<script lang="ts">
  import type { PageProps } from './$types';
  import { ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
  import TruncatedText  from '$lib/components/TruncatedText.svelte';
  import { A } from 'flowbite-svelte';
  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>SIH3 BBWS Citanduy</title>
  <meta name="description" content="Sistem Informasi Hidro Meteorologi, Hidrologi dan Hidro Geologi Resmi BBWS Citanduy" />
</svelte:head>
<section id="hero">
  <div class="flex flex-col md:flex-row gap-4 items-center pb-5">
    <div class="w-full md:basis-2/3">
      <h1 class="text-6xl text-gray-600 font-bold my-5 md:tracking-widest">SIH3 <img src="/img/logo-pupr.png" alt="" class="inline me-3 pb-2"><span class="text-2xl font-light md:tracking-wide">Wilayah Sungai Citanduy</span>
              <p class="text-xl text-gray-600 mt-5 font-light"></p>
      </h1>
      <p class="text-4xl text-gray-400 my-4 font-light">Sistem Informasi<br>Hidro&nbsp;Meteorologi, Hidrologi dan Hidro&nbsp;Geologi</p>

    </div>
    <div class="w-full md:basis-1/3 order-first">
      
    </div>
  </div>
  <div class="text-center border-t-2 border-b-1 py-2">
    <p>
      <span class="me-3 mt-5 bg-gray-400 text-white text-xs p-1">BERITA TERBARU</span>
    <a class="me-5" href="https://sda.pu.go.id/balai/bbwscitanduy/{data.berita[0].a_href}">{data.berita[0].a_title}</a> &dash; <a href="#berita" class="ms-3 italic text-gray-400">berita lain...</a>
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
  Hujan yang terjadi di wilayah Jawa Barat dan sebagian Jawa Tengah
</div>
<div>
  Tinggi Muka Air
  Cendrung Naik | Datar | Cendrung Turun
</div>
</section>

<section id="hidrogeologi" class="mt-10 border-t border-t-gray-200">
<div class="py-5 mt-5">
  <div class="text-center">
    <h2 class="text-3xl font-bold my-5 md:tracking-widest">Air Tanah</h2>
  </div>
  Cadangan Air Tanah
</div>
<div>
  Sumur Pantau
</div>
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
    <div class="">
      <div class="bg-green-600 p-3 rounded-sm">
      <img src="https://d2s1u1uyrl4yfi.cloudfront.net/dlh/logo/db4f7efb8a70794e1f8b54cac83dbdda.png" alt="Dinas Lingkungan Hidup Provinsi Jawa Barat">
      </div>
      <p class="text-xs pt-3">Dinas Lingkungan Hidup Provinsi Jawa Barat <a href="https://dlh.jabarprov.go.id/"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
    </div>

    <div class="">
      <img src="/img/jateng_logo.png" width="80" alt="Dinas Lingkungan Hidup Jawa Tengah">
      <p class="text-xs pt-3">Dinas Lingkungan Hidup dan Kehutanan Jawa Tengah  <a href="https://dlhkjatengprov.go.id"><ArrowUpRightFromSquareOutline class="inline" size="sm" /></a></p>
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
  </div>
</section>