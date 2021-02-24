<script lang="ts">
  import DownArrowSvg from "./svgs/numericArrowDown.svg";
  import { onDestroy, onMount } from "svelte";
  import PropertiesMenuSvg from "./svgs/buttons/propertiesMenu.svg";
  import CheckBox from "./CoreUI/CheckBox.svelte";
  export let activeProperties;
  let open = false;
  let node;

  function checkClickInside(e: Event) {
    if (node && !node.contains(e.target)) {
      open = false;
    }
  }

  onMount(() => document.addEventListener("mousedown", checkClickInside));
  onDestroy(() => document.removeEventListener("mousedown", checkClickInside));
</script>

<div class="properties-wrapper" bind:this={node}>
  <button
    class="properties-button"
    data-tooltip="Animation Properties"
    aria-label="Animation Properties"
    on:click={() => (open = !open)}
    ><PropertiesMenuSvg />
  </button>
  {#if open}
    <div class="properties-menu">
      <h3>KEYFRAME PROPERTIES</h3>
      <div>
        <label>
          <CheckBox bind:checked={activeProperties.strokeDashArray} />
          <span>Dash Array</span>
        </label>
        <label>
          <CheckBox bind:checked={activeProperties.strokeDashOffset} />
          <span>Dash Offset</span>
        </label>
        <label>
          <CheckBox bind:checked={activeProperties.strokeColor} />
          <span>Color</span>
        </label>
      </div>
    </div>
  {/if}
</div>

<style>
  h3 {
    color: #cb559e;
    font-size: 12px;
    margin: 0;
  }

  .properties-wrapper {
    position: relative;
  }

  .properties-menu {
    padding: 0.7rem 1.2rem;
    position: absolute;
    right: 0;
    margin-top: 0.5rem;
    width: 200px;
    background-color: #000;
    background: linear-gradient(45deg, #7d1d43, #5c1646);
    z-index: 5;
    transform: translateX(50%);
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .properties-button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    cursor: pointer;
  }

  button:active {
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.13);
    /* background-color: var(--button-bg-active); */
  }

  label {
    display: flex;
    align-items: center;
    color: white;
    margin-top: 0.5rem;
    cursor: pointer;
  }

  label > span {
    margin-left: 0.5rem;
  }

  label > input {
    margin-right: 0.5rem;
  }

  .properties-button > span {
    margin-right: 0.3rem;
  }
</style>
