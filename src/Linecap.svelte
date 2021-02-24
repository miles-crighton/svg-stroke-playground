<script lang="ts">
  import RoundedSvg from "./svgs/buttons/roundedLinecap.svg";
  import SquareSvg from "./svgs/buttons/squareLinecap.svg";
  import ButtSvg from "./svgs/buttons/buttLinecap.svg";
  type Linecap = "butt" | "round" | "square";
  export let initialLinecap;
  export let linecap: Linecap = initialLinecap || "butt";
</script>

<div class="linecap">
  <span>Linecap</span>
  <div class="buttons">
    <button
      class="left-button"
      on:click={() => (linecap = "round")}
      data-tooltip="Rounded"
      aria-label={`Rounded Linecap`}><RoundedSvg /></button
    >
    <button
      class="center-button"
      on:click={() => (linecap = "square")}
      data-tooltip="Square"
      aria-label={`Square Linecap`}><SquareSvg /></button
    >
    <button
      class="right-button"
      on:click={() => (linecap = "butt")}
      data-tooltip="Butt"
      aria-label={`Butt Linecap`}><ButtSvg /></button
    >
  </div>
</div>

<style>
  .linecap {
    display: flex;
    align-items: center;
  }

  span {
    font-weight: 600;
    color: #6e1e49;
    flex: 1;
  }

  .buttons {
    display: flex;
  }

  button {
    background-color: var(--button-bg);
    border: 1px solid var(--button-border);
    display: flex;
    align-items: center;
  }

  .center-button {
    border-radius: 0;
  }

  .left-button {
    border-right: 0;
    border-radius: 6px 0 0 6px;
  }

  .right-button {
    border-left: 0;
    border-radius: 0 6px 6px 0;
  }
</style>
