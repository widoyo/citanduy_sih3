<script lang="ts">
  let { telemetri, sh, sk, sm } = $props();

  const width = 100;
  const height = 50;
  const padding = 2;

  let data = $derived(telemetri.raw.map(d => d.wlevel));
  
  let minValue = $derived(Math.min(...data, 0));
  let maxValue = $derived(Math.max(...data));
  let range = $derived(maxValue - minValue || 1);
  
  let points = $derived(data.map((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (value - minValue) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' '));
  
  // Create area path (line + bottom edge)
  let areaPath = $derived.by(() => {
    const linePoints = data.map((value, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = padding + (1 - (value - minValue) / range) * (height - padding * 2);
      return `${x},${y}`;
    });
    
    const lastX = padding + (width - padding * 2);
    const bottomY = height - padding;
    
    return `M ${padding},${bottomY} L ${linePoints[0]} ${linePoints.slice(1).map(p => `L ${p}`).join(' ')} L ${lastX},${bottomY} Z`;
  });
  
  let zeroY = $derived(padding + (1 - (0 - minValue) / range) * (height - padding * 2));
  
  let shY = $derived(sh !== undefined && sh !== null ? padding + (1 - (sh - minValue) / range) * (height - padding * 2) : null);
  let skY = $derived(sk !== undefined && sk !== null ? padding + (1 - (sk - minValue) / range) * (height - padding * 2) : null);
  let smY = $derived(sm !== undefined && sm !== null ? padding + (1 - (sm - minValue) / range) * (height - padding * 2) : null);
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
  <defs>
    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.05" />
    </linearGradient>
  </defs>
  
  <!-- Area fill -->
  <path
    d={areaPath}
    fill="url(#areaGradient)"
  />
  
  <!-- Zero baseline -->
  <line
    x1={padding}
    y1={zeroY}
    x2={width - padding}
    y2={zeroY}
    stroke="#b5b7bb"
    stroke-width="1"
  />
  
  <!-- Threshold lines -->
  {#if shY !== null}
    <line
      x1={padding}
      y1={shY}
      x2={width - padding}
      y2={shY}
      stroke="#22c55e"
      stroke-width="1"
      stroke-dasharray="2,2"
    />
  {/if}
  
  {#if skY !== null}
    <line
      x1={padding}
      y1={skY}
      x2={width - padding}
      y2={skY}
      stroke="#eab308"
      stroke-width="1"
      stroke-dasharray="2,2"
    />
  {/if}
  
  {#if smY !== null}
    <line
      x1={padding}
      y1={smY}
      x2={width - padding}
      y2={smY}
      stroke="#ef4444"
      stroke-width="1"
      stroke-dasharray="2,2"
    />
  {/if}
  
  <!-- Line stroke -->
  <polyline
    points={points}
    fill="none"
    stroke="#3b82f6"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
</svg>

<style>
  svg {
    display: block;
  }
</style>