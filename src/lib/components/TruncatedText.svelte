<script>
  export let text;
  export let maxLength = 70; // Default to 70 characters

  $: truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
</script>

<span>{truncatedText}</span>

<style>
  /* Optional styling for the ellipsis or the text itself */
</style>