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
    left: 50%;
    transform: translateX(-50%);
    bottom: 10%;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.5rem;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    box-shadow: 0 0 22px 1px rgba(0, 0, 0, 0.1),
      inset 0 -2px 3px rgba(0, 0, 0, 0.08);
  }

  .border-div {
    border-left: 1px solid grey;
    width: 1px;
    height: 100%;
    margin-right: 0.5rem;
  }

  .zoom-controls__button {
    background-color: #f7f7f7;
    width: 45px;
    height: 45px;
    border: 1px solid #c8c8c8;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
    margin: 0;
    margin-right: 0.5rem;
  }

  .zoom-controls__button:active {
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.18);
    background-color: #e9e9e9;
  }

  .zoom-controls__button:active > .zoom-controls__button--content {
    transform: translateY(2px);
  }
</style>
