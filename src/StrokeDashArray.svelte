<script lang="ts">
  import RangeNumericInput from "./RangeNumericInput.svelte";
  import SmallCrossSvg from "./svgs/buttons/smallCross.svg";

  export let arrayValue = [22];
  let value = 0;
  export let stringValue: string = arrayValue.join(" ");

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
  <label>stroke-dasharray</label><span>{`"${stringValue}"`}</span>
</div>
{#each arrayValue as val, i}
  <div class="array-row">
    <button class="number-block" on:click={() => removeArrayValue(i)}
      >{i + 1}</button
    ><RangeNumericInput bind:value={arrayValue[i]} initialValue={val} />
  </div>
{/each}
<button on:click={addArrayValue}>Add</button>

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
  }

  label {
    font-weight: bold;
    color: #6e1e49;
  }

  .label-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
  }

  .label-wrapper label {
    flex: 1;
  }

  .label-wrapper span {
    color: #c3c3c3;
    font-weight: 500;
    font-style: italic;
  }

  .number-block:hover {
    background-color: #fe859e;
  }

  .array-row {
    align-items: center;
    display: flex;
  }
</style>
