<script lang="ts">
  import { Button } from 'flowbite-svelte';
  import { ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
</script>
<svelte:head>
  <title>Sekretariat SIH3 Wilayah Sungai Citanduy</title>
  <meta name="description" content="Sekretariat Resmi Tim SIH3 Wilayah Sungai Citanduy" />
</svelte:head>

<section id="hero">
  <div class="flex flex-col md:flex-row gap-4 items-center pb-5">
    <div class="w-full md:basis-1/3">
      <img src="/img/logo_h3.png" height="20" alt="Hidro Meteorologi, Hidrologi, Hidro Geologi">
    </div>
    <div class="w-full md:basis-2/3">
      <h1 class="text-6xl text-gray-600 font-bold my-5 md:tracking-widest">Sekretariat</h1>
    <p class="text-4xl text-gray-600 mt-5 font-light">SIH3 Wilayah Sungai Citanduy</p>
      <p class="text-2xl text-gray-500 my-4 font-light">
        Kantor Balai Besar Wilayah Sungai Citanduy<br>
        Jl. Prof. Ir. Sutami no 1, Karangpanimbal, Purwaharja<br>
        Kota Banjar, provinsi Jawa Barat - 46332
        </p>
        <Button href="https://maps.app.goo.gl/s65rUoBgeUuYPtc19">Peta Google <ArrowUpRightFromSquareOutline class="inline ms-3" /></Button>

    </div>
  </div>
</section>
