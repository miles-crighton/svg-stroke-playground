<script lang="ts">
  import CrossSvg from "../svgs/buttons/smallCross.svg";
  export let checked = false;
</script>

<label class="checkbox" class:checked on:click={() => (checked = !checked)}>
  <input role="checkbox" />
  {#if checked}
    <CrossSvg />
  {/if}
</label>

<style>
  .checkbox {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checked {
    background-color: #f44586;
  }
</style>
