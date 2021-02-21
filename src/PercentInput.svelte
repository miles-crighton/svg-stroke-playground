<script lang="ts">
  export let initialValue = 1;
  export let value: number | string = initialValue;
  export let max = 100;
  export let min = 0;
  function handleKeyPress(e: KeyboardEvent) {
    const numeric = /\d/;
    if (!numeric.test(e.key)) {
      e.preventDefault();
    }
    console.log(e.key);
  }

  function validateOnBlur() {
    if (value === "") {
      value = min;
    }
    // Limit value min -> max
    value = value > max ? max : value;
    value = value < min ? min : value;
  }
</script>

<label aria-label={`Percent Input`}
  ><input
    on:keypress={handleKeyPress}
    bind:value
    on:blur={validateOnBlur}
    type="number"
    {min}
    {max}
  />%</label
>

<style>
  label {
    border: 1px solid var(--button-border);
    background-color: var(--button-bg);
    box-shadow: var(--button-inset-shadow);
    border-radius: 4px;
    color: grey;
    width: 70px;
    display: flex;
    align-items: center;
    padding-right: 0.5rem;
    font-size: 12px;
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
