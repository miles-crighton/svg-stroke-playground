<script lang="ts">
  import NumericInput from "./NumericInput.svelte";

  export let label: string;
  export let initialValue = 0;
  export let value = initialValue;
</script>

{#if label}<label for="dash-offset">{label}</label>{/if}
<div class="wrapper">
  <input
    type="range"
    id="dash-offset"
    name="dash-offset"
    min="0"
    max="200"
    bind:value
  />
  <NumericInput bind:value />
</div>

<style>
  .wrapper {
    display: flex;
    width: 100%;
  }
  label {
    font-weight: bold;
    color: #6e1e49;
  }
</style>
