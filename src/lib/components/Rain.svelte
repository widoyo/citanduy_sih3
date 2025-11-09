<script lang="ts">
  import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";
  import RainChart from "$lib/components/RainChart.svelte";
  let { rainData, groupedRainData } = $props();
</script>

<h3 class="text-2xl font-bold mt-10">Hujan</h3>
{#if rainData.length > 0}
  <p class="text-sm text-gray-500 mb-5">
    Hujan terjadi hari ini di <b>{rainData.length}</b> lokasi dari <b>51</b> Pos
    Hujan
  </p>
{:else}
  <p class="text-sm text-gray-500">Tidak ada hujan hari ini.</p>
{/if}
<div class="masonry-grid">
  {#if rainData.length > 0}
    {#each groupedRainData as group}
      <div class="mb-5" style="margin-bottom: 3rem;">
        <h2 class="text-xl font-bold border-b-2 pb-1">
          {group.label}
          <span class="ms-2 font-light text-xs text-gray-500">HUJAN</span>
        </h2>
        <ul class="mt-3">
          {#each group.items as item}
            <li class="grid grid-cols-[1fr_65px_65px] gap-1">
              <span>{item.pos.nama.replace("PCH ", "")}</span>
              <RainChart telemetri={item.telemetri} />
              <span class="text-right"
                >{item.telemetri.rain24.toFixed(1)}
                <span class="font-light text-xs text-gray-500">mm</span></span
              >
            </li>
          {/each}
        </ul>
      </div>
    {/each}
    <div class="text-gray-500 ps-2">
      <small>
      <p>Hujan per jam:</p>
      <ul class="flex gap-4">
        <li class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full" style="background-color: #f63b82"
          ></span>
          Sangat Lebat
        </li>
        <li class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full" style="background-color: #ffa500"
          ></span>
          Lebat
        </li>
        <li class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full" style="background-color: #d6c136"
          ></span>
          Sedang
        </li>
        <li class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full" style="background-color: #20ff20"
          ></span>
          Ringan
        </li>
      </ul>
    </small>
    </div>
  {/if}
</div>

<style>
  .masonry-grid {
    column-count: 1; /* Default untuk mobile */
    column-gap: 1rem; /* Sama dengan gap-4 di Tailwind */
  }

  @media (min-width: 768px) {
    /* md breakpoint */
    .masonry-grid {
      column-count: 2;
    }
  }

  @media (min-width: 1024px) {
    /* lg breakpoint */
    .masonry-grid {
      column-count: 4;
    }
  }

  .masonry-grid > div {
    break-inside: avoid-column; /* Penting untuk mencegah kartu terpotong */
    margin-bottom: 1rem;
  }
</style>
