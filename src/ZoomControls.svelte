<script lang="ts">
  import ZoomInSvg from "./svgs/zoom-in.svg";
  import ZoomOutSvg from "./svgs/zoom-out.svg";
  import ZoomResetSvg from "./svgs/zoom-reset.svg";
  import PlaySvg from "./svgs/buttons/play.svg";
  import PauseSvg from "./svgs/buttons/pause.svg";
  import RestartSvg from "./svgs/buttons/restart.svg";
  export let zoomLevel = 1;
  export let playing = true;

  const playAnimation = () => (playing = true);
  const pauseAnimation = () => (playing = false);

  const increaseZoom = () => {
    zoomLevel = Math.floor(zoomLevel * 100 * 1.2) / 100;
  };

  const decreaseZoom = () => {
    zoomLevel = Math.floor((zoomLevel * 100) / 1.2) / 100;
  };

  const resetZoom = () => (zoomLevel = 1);

  $: {
    document.documentElement.style.setProperty(
      "--animation-state",
      `${playing ? "running" : "paused"}`
    );
  }
</script>

<div class="zoom-controls">
  <button class="zoom-controls__button" on:click={playAnimation}
    ><div class="zoom-controls__button--content"><PlaySvg /></div>
  </button>
  <button class="zoom-controls__button" on:click={pauseAnimation}
    ><div class="zoom-controls__button--content"><PauseSvg /></div></button
  >
  <div class="border-div" />
  <button class="zoom-controls__button" on:click={increaseZoom}
    ><div class="zoom-controls__button--content"><ZoomInSvg /></div>
  </button>
  <button class="zoom-controls__button" on:click={decreaseZoom}
    ><div class="zoom-controls__button--content"><ZoomOutSvg /></div></button
  >
  <button class="zoom-controls__button" on:click={resetZoom}
    ><div class="zoom-controls__button--content">
      <ZoomResetSvg />
    </div></button
  >
  <span>{Math.round(zoomLevel * 100)}%</span>
</div>

<style>
  .zoom-controls {
    position: absolute;

    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.5rem 0.5rem;
    height: 80px;
    background-color: var(--controls-bg);
    border-top: 1px solid var(--controls-border);
  }

  .border-div {
    border-left: 1px solid grey;
    width: 1px;
    height: 100%;
    margin-right: 0.5rem;
  }

  .zoom-controls__button {
    background-color: var(--button-bg);
    width: 35px;
    height: 35px;
    border: 1px solid var(--button-border);
    box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.13);
    border-radius: 4px;
    margin: 0;
    margin-right: 0.5rem;
  }

  .zoom-controls__button:active {
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.18);
    background-color: var(--button-bg-active);
  }

  .zoom-controls__button:active > .zoom-controls__button--content {
    transform: translateY(2px);
  }
</style>
