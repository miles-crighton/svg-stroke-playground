<script lang="ts">
  import NumericInput from "./NumericInput.svelte";

  export let label: string;
  export let initialValue = 0;
  export let value = initialValue;
</script>

{#if label}<label for="dash-offset">{label}</label>{/if}
<input
  type="range"
  id="dash-offset"
  name="dash-offset"
  min="0"
  max="200"
  bind:value
/>
<NumericInput bind:value />
