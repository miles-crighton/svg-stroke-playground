<script lang="ts">
  import RangeNumericInput from "./CoreUI/RangeNumericInput.svelte";
  import SmallCrossSvg from "./svgs/buttons/smallCross.svg";
  import SmallPlusSvg from "./svgs/buttons/smallPlus.svg";
  import AddToArraySvg from "./svgs/buttons/addToArray.svg";

  export let stringValue = "22";
  let hovered = null;
  export let arrayValue =
    typeof stringValue === "string"
      ? stringValue.split(" ").map((val) => parseInt(val))
      : [1];

  function addArrayValue() {
    arrayValue.push(1);
    arrayValue = arrayValue;
  }

  function removeArrayValue(idx: number) {
    arrayValue.splice(idx, 1);
    arrayValue = arrayValue;
  }

  $: stringValue = arrayValue.join(" ");
</script>

<div class="label-wrapper">
  <label>stroke-dasharray</label><button
    on:click={addArrayValue}
    class="add-button"
    data-tooltip="Add to stroke array"
    aria-label="Add to stroke array"><AddToArraySvg /></button
  ><span>{`"${stringValue}"`}</span>
</div>
{#each arrayValue as val, i}
  <div class="array-row">
    <button
      class="number-block"
      on:click={() => {
        removeArrayValue(i);
        hovered = null;
      }}
      on:mouseover={() => (hovered = i)}
      on:mouseleave={() => (hovered = null)}
    >
      {#if hovered === i}
        <SmallCrossSvg />
      {:else}
        <span>{i + 1}</span>
      {/if}
    </button>
    <RangeNumericInput bind:value={arrayValue[i]} initialValue={val} />
  </div>
  {#if i < arrayValue.length - 1}
    <div class="vertical-spacer-1" />
  {/if}
{/each}

<style>
  .number-block {
    border-radius: 4px;
    color: #fe859e;
    border: 1px solid #fe859e;
    height: 25px;
    width: 20px;
    padding: 0;
    margin: 0;
    margin-right: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: transparent;

    transition: background-color 200ms;
  }

  .vertical-spacer-1 {
    height: 0.3rem;
  }

  .add-button {
    /* height: 15px;
    width: 15px; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #fe86cd; */
    background-color: transparent;
    box-shadow: none;
    /* padding: 0; */
    margin: 0;
    border: 0;
    cursor: pointer;
  }

  .add-button:active {
    box-shadow: var(--button-active-shadow);
  }

  label {
    font-weight: bold;
    color: #6e1e49;
  }

  .label-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;
  }

  .label-wrapper label {
    margin-right: 0.5rem;
  }

  .label-wrapper span {
    color: #c3c3c3;
    font-weight: 500;
    font-style: italic;
    flex: 1;
    text-align: right;
  }

  .number-block:hover {
    background-color: #fe859e;
  }

  .array-row {
    align-items: center;
    display: flex;
  }
</style>
