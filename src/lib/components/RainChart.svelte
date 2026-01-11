<script lang="ts">
  let { telemetri } = $props();
  const width = 64;
  const height = 24;
  const maxRain = 50;
  
  // Reorder data starting from hour 7 to hour 6 next day
  const orderedHours = [...Array(17).keys()].map(i => i + 7).concat([...Array(7).keys()]);
  const orderedData = orderedHours.map((h, index) => {
    const d = new Date();
    // If the hour is small (0-6) and it's at the end of our array, 
    // it likely refers to "tomorrow"
    if (index >= 17) {
      d.setDate(d.getDate() + 1);
    }
    
    const dateStr = d.toISOString().split('T')[0];
    const hourStr = h.toString().padStart(2, '0');
    const isoKey = `${dateStr}T${hourStr}:00:00`;
    
    return telemetri.rain[isoKey]?.rain || 0;
  });
  const barWidth = width / 24;
  
  const bars = orderedData.map((rain, i) => {
    const barHeight = (rain / maxRain) * height;
    return {
      x: i * barWidth,
      y: height - barHeight,
      width: barWidth - 0.2,
      height: barHeight,
      fill: rain > 20 ? '#f63b82' : rain > 10 ? '#ffa500' : rain > 5 ? '#d6c136' : '#20ff20'
    };
  });
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
  <!-- Bottom line (y-axis) -->
  <line x1="0" y1={height - 0.5} x2={width} y2={height - 0.5} stroke="#ccc" stroke-width="1" />
  
  <!-- Bars -->
  {#each bars as bar}
    <rect x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.fill} />
  {/each}
</svg>
<style>
  svg {
    display: block;
  }
</style>