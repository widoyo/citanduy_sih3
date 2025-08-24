<script>
  import { onMount } from "svelte";
  import "simple-sparkline-chart"; // from npm (install with: npm i simple-sparkline-chart)

  export let data = [];   // [{ t: Date|string, v: number }, ...]
  export let width = 200;
  export let height = 40;
  export let stroke = "#4f9cff";
  export let fill = 0.2;
  export let showDate = true;

  let chartEl;
  let lastDate = "";

  onMount(() => {
    if (!data || !data.length) return;

    // Feed sparkline values
    chartEl.setAttribute("data-values", data.map(d => d.v).join(","));
    chartEl.setAttribute("data-width", width);
    chartEl.setAttribute("data-height", height);
    chartEl.setAttribute("data-color-stroke", stroke);
    chartEl.setAttribute("data-filled", fill);

    new window.SimpleSparkLineChart(chartEl);

    // Save latest date
    const latest = data[data.length - 1];
    if (latest?.t) {
      const dt = new Date(latest.t);
      lastDate = dt.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      });
    }
  });
</script>

<style>
  .spark-container {
    display: inline-block;
    position: relative;
    padding-right: 70px; /* space for date label */
  }
  .last-label {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #555;
  }
</style>

<div class="spark-container">
  <div bind:this={chartEl} class="sparkline"></div>
  {#if showDate && lastDate}
    <div class="last-label">{lastDate}</div>
  {/if}
</div>