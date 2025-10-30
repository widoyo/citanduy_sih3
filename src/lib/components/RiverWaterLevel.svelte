<script lang="ts">
  import { ArrowDownOutline, ArrowUpOutline } from 'flowbite-svelte-icons';
  import Sparkline from "./Sparkline.svelte";

  let {groupedWLevelData} = $props();
  
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

</style>
<div>
  <h3 class="text-2xl font-bold mt-10 mb-5">Tinggi Muka Air Sungai</h3>
  <p class="text-sm mb-3 text-gray-500">
    T15: thd 15 menit lalu, T60: thd 60 menit lalu
  </p>

  <div class="masonry-grid">
    {#each groupedWLevelData as group}
      <div class="border border-gray-200 rounded-sm p-2 shadow-xs">
        <h2 class="text-lg/5 font-bold mb-3">
          <small class="text-gray-500 font-light">sungai</small><br />
          {group.sungai}
        </h2>

        <ol class="list-decimal ms-4">
          {#each group.items as item}
            <li class="mb-6">
              <div class="mb-2">
                {item.pos.nama}
                <small class="font-light text-gray-500">
                  <b class="font-bold">+{item.pos.elevasi}</b> mdpl
                </small>
              </div>

              {#if item.pos.kabupaten}
                <small class="font-light">
                  ds {item.pos.desa}, kec. {item.pos.kecamatan}, kab.
                  {item.pos.kabupaten}
                </small><br />
              {/if}

              {#if item.pos.sh}
                <small class="font-light text-gray-500">SIAGA</small>
                <span class="text-xs text-white bg-green-700 rounded-xs px-1">
                  {(item.pos.sh / 100).toFixed(1)}
                </span>
                <span class="text-xs text-gray bg-yellow-500 rounded-xs px-1">
                  {(item.pos.sk / 100).toFixed(1)}
                </span>
                <span class="text-xs text-white bg-red-700 rounded-xs px-1">
                  {(item.pos.sm / 100).toFixed(1)}
                </span><br />
              {/if}

              <small
                class="font-light text-gray-500"
                title={item.telemetri.sampling}
              >
                TMA
              </small>
              {((item.telemetri.wlevel || 0) / 100).toFixed(1)} m,

              <small class="font-light text-gray-500">T60</small>
              {#if item.telemetri.trend.t_60_min.trend === "naik"}
                <ArrowUpOutline class="inline w-4 h-4 text-red-500" />
              {:else if item.telemetri.trend.t_60_min.trend === "turun"}
                <ArrowDownOutline class="inline w-4 h-4 text-green-500" />
              {:else}-{/if}

              <small class="font-light text-gray-500">T15</small>
              {#if item.telemetri.trend.t_15_min.trend === "naik"}
                <ArrowUpOutline class="inline w-4 h-4 text-red-500" />
              {:else if item.telemetri.trend.t_15_min.trend === "turun"}
                <ArrowDownOutline class="inline w-4 h-4 text-green-500" />
              {:else}-{/if}

              <!-- ✅ Sparkline added -->
              {#if item.telemetri.series}
                <div class="mt-2">
                  <Sparkline data={item.telemetri.series} width={200} height={40} stroke="#10b981" fill={0.15}/>
                </div>
              {/if}
            </li>
          {/each}
        </ol>
      </div>
    {/each}
  </div>
</div>