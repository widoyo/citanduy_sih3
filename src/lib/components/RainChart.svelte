<script lang="ts">
  let { telemetri } = $props();
  const width = 64;
  const height = 34; // Increased height to accommodate labels (24 + 10)
  const chartHeight = 24; // Original drawing area
  const maxRain = 20;
  
  // 1. Simplify Data Keys
  const simplifiedRain = Object.fromEntries(
    Object.entries(telemetri.rain).map(([isoKey, data]) => {
      const hourKey = isoKey.split('T')[1].split(':')[0];
      return [hourKey, data];
    })
  );

  // 2. Prepare Ordered Hours (7...23, 0...6)
  const orderedHours = [...Array(17).keys()].map(i => i + 7).concat([...Array(7).keys()]);
  
  // 3. Map Data to Bars
  const barWidth = width / 24;
  const bars = orderedHours.map((h, i) => {
    const hourStr = h.toString().padStart(2, '0');
    const rain = simplifiedRain[hourStr]?.rain || 0;
    const barHeight = (rain / maxRain) * chartHeight;
    
    return {
      hour: hourStr,
      x: i * barWidth,
      y: chartHeight - barHeight,
      width: barWidth - 0.2,
      height: barHeight,
      fill: rain > 20 ? '#f63b82' : rain > 10 ? '#ffa500' : rain > 5 ? '#d6c136' : '#20ff20'
    };
  });

  // 4. Determine which labels to show
  // Logic: Always show first (07), always show last (06). 
  // Show 15 only if the total hours rendered passed that point.
  const labels = bars.filter((bar, index) => {
    return index === 0 || index === bars.length - 1 || bar.hour === "15";
  });
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
  <line x1="0" y1={chartHeight} x2={width} y2={chartHeight} stroke="#ccc" stroke-width="0.5" />
  
  {#each bars as bar}
    <rect x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.fill} />
  {/each}

  {#each labels as label}
    <text 
      x={label.x} 
      y={chartHeight + 8} 
      font-size="6" 
      fill="#666" 
      text-anchor={label.hour === "06" ? "end" : "start"}
    >
      {label.hour}
    </text>
  {/each}
</svg>

<style>
  svg {
    display: block;
    font-family: sans-serif;
  }
</style>