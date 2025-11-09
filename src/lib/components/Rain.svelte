<script lang="ts">
  import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";
  let { rainData, groupedRainData } = $props();
</script>

<h3 class="text-2xl font-bold mt-10 mb-5">Hujan</h3>
{#if rainData.length > 0}
  <p class="text-sm text-gray-500">
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
            <li class="grid grid-cols-2 gap-2">
              <span>{item.pos.nama.replace("PCH ", "")}</span>
              <span class="text-right"
                >{item.telemetri.rain24.toFixed(1)}
                <span class="font-light text-xs text-gray-500">mm</span></span
              >
            </li>
          {/each}
        </ul>
      </div>
    {/each}
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
