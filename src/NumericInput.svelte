<script lang="ts">
  import ArrowUpSvg from "./svgs/numericArrowUp.svg";
  import ArrowDownSvg from "./svgs/numericArrowDown.svg";
  export let initialValue = 0;
  export let value = initialValue;
  export let stepValue = 0;
  export let min = 0;
  export let max = 10000;
  let input;

  const incrementValue = () => {
    if (value + stepValue > max) {
      value = max;
    } else {
      value += stepValue;
      value = parseFloat(value.toFixed(1));
    }
  };

  const decrementValue = () => {
    if (value - stepValue < min) {
      value = min;
    } else {
      value -= stepValue;
      value = parseFloat(value.toFixed(1));
    }
  };
</script>

<div class="numeric-input">
  <input class="quantity" name="quantity" bind:this={input} bind:value />
  <div class="numeric-input__buttons">
    <button on:click={incrementValue} class="button-up"
      ><div class="button--contents"><ArrowUpSvg /></div></button
    >
    <button on:click={decrementValue} class="button-down"
      ><div class="button--contents">
        <ArrowDownSvg />
      </div></button
    >
  </div>
</div>

<style>
  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  input {
    text-align: center;
    padding-right: 1.5rem;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border: 1px solid #c8c8c8;
    box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.13);
    border-radius: 4px;
    color: #464646;
    margin: 0 !important;
  }

  .numeric-input {
    min-width: 80px;
    flex: 0;
    /* height: 45px; */
    position: relative;
  }

  button {
    margin: 0;
    display: block;
    height: 5px;
    box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.08);
    background-color: #f4f4f4;
    margin-bottom: 0px;
  }

  button:focus-visible {
    box-shadow: 0 0 0 2px blue;
  }

  button:active {
    background-color: #e8e8e8;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
  }

  button:active > .button--contents {
    transform: translateY(1px);
  }

  .button--contents {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .button-up {
    border: 1px solid #c9c9c9;
    border-radius: 4px 4px 0 0;
  }

  .button-down {
    border: 1px solid #c9c9c9;
    border-top: 0;
    border-radius: 0 0 4px 4px;
  }

  .numeric-input__buttons {
    top: 0.2rem;
    position: absolute;
    right: 4px;
  }
</style>
