<script lang="ts">
  import Slider from "./Slider.svelte";

  import NumericInput from "./NumericInput.svelte";

  export let label: string;
  export let initialValue = 0;
  export let value = initialValue;
</script>

{#if label}<label for="dash-offset">{label}</label>{/if}
<div class="wrapper">
  <Slider bind:value />
  <NumericInput stepValue={1} bind:value initialValue={value} />
</div>

<style>
  .wrapper {
    display: flex;
    width: 100%;
    align-items: center;
  }
  label {
    font-weight: bold;
    color: #6e1e49;
  }
</style>
