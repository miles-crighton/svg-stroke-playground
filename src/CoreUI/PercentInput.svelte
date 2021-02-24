<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let initialValue = 1;
  export let value: number | string = initialValue;
  export let max = 100;
  export let min = 0;
  export let borders = true;
  export let rounded = true;
  export let leftCorner = false;
  export let onSubmit = null;
  export let error = null;

  function handleKeyPress(e: KeyboardEvent) {
    const numeric = /\d/;
    if (!numeric.test(e.key)) {
      e.preventDefault();
      error = "Only numerics";
    }
  }

  function validateOnBlur() {
    if (value === "") {
      value = min;
    }
    // Limit value min -> max
    value = value > max ? max : value;
    value = value < min ? min : value;

    if (onSubmit) onSubmit(value);
  }

  $: if (error) setTimeout(() => (error = null), 1500);
</script>

<div class="container">
  {#if error}
    <div class="error" in:fly={{ y: 5 }} out:fade>{error}</div>
  {/if}
  <label
    class:borders
    class:rounded
    class:left-corner={leftCorner}
    aria-label={`Percent Input`}
    ><input
      on:keypress={handleKeyPress}
      bind:value
      on:blur={validateOnBlur}
      type="number"
      {min}
      {max}
    />%</label
  >
</div>

<style>
  .container {
    position: relative;
  }

  .error {
    position: absolute;
    top: -2.2rem;
    color: white;
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    background-color: #de2742;
    font-weight: bold;
    text-align: center;
    width: 125px;
    /* left:  */
    left: -30px;
    /* transform: translateX(-50%); */
    background: linear-gradient(45deg, #de2742, #d01515);
    z-index: 2;
  }

  .left-corner {
    border-radius: 6px 0 0 0;
  }

  label {
    background-color: var(--button-bg);
    box-shadow: var(--button-inset-shadow);

    color: grey;
    width: 70px;
    display: flex;
    align-items: center;
    padding-right: 0.5rem;
    font-size: 12px;
  }

  .rounded {
    border-radius: 4px;
  }

  .borders {
    border: 1px solid var(--button-border);
  }

  label:focus-within {
    box-shadow: 0 0 0 2px blue;
  }

  input {
    border: 0;
    background-color: transparent;
    outline: none;
    text-align: right;
    margin: 0;
    width: 100%;
    font-size: 1rem;
    color: var(--input-text);
  }

  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
</style>
