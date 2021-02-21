<script lang="ts">
  import ZoomInSvg from "./svgs/zoom-in.svg";
  import ZoomOutSvg from "./svgs/zoom-out.svg";
  import ZoomResetSvg from "./svgs/zoom-reset.svg";
  import PlaySvg from "./svgs/buttons/play.svg";
  import PauseSvg from "./svgs/buttons/pause.svg";
  import RestartSvg from "./svgs/buttons/restart.svg";
  import PercentInput from "./CoreUI/PercentInput.svelte";
  import Footer from "./Footer.svelte";

  export let zoomLevel = 1;
  export let zoomLevelPercent = Math.round(zoomLevel * 100);
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

  $: {
    zoomLevel = zoomLevelPercent / 100;
  }
</script>

<div class="zoom-controls">
  <Footer />
  <div>
    <div class="buttons-label">Animation</div>
    <div class="button-row">
      <button class="zoom-controls__button" on:click={playAnimation}
        ><div class="zoom-controls__button--content"><PlaySvg /></div>
      </button>
      <button class="zoom-controls__button" on:click={pauseAnimation}
        ><div class="zoom-controls__button--content"><PauseSvg /></div></button
      >
    </div>
  </div>
  <div class="border-div" />
  <div>
    <div class="buttons-label">Zoom</div>
    <div class="button-row">
      <button class="zoom-controls__button" on:click={increaseZoom}
        ><div class="zoom-controls__button--content"><ZoomInSvg /></div>
      </button>
      <button class="zoom-controls__button" on:click={decreaseZoom}
        ><div class="zoom-controls__button--content">
          <ZoomOutSvg />
        </div></button
      >
      <button class="zoom-controls__button" on:click={resetZoom}
        ><div class="zoom-controls__button--content">
          <ZoomResetSvg />
        </div></button
      >
      <PercentInput
        initialValue={Math.round(zoomLevel * 100)}
        max={1000}
        min={10}
        bind:value={zoomLevelPercent}
      />
    </div>
  </div>
</div>

<style>
  .buttons-label {
    color: #979797;
    font-size: 14px;
    margin-bottom: 0.3rem;
  }
  .button-row {
    display: flex;
  }
  .zoom-controls {
    position: relative;

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
    border-left: 1px dashed var(--controls-border);
    width: 1px;
    height: 50px;
    margin-right: 1rem;
    margin-left: 0.5rem;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .zoom-controls__button--content {
    height: 17px;
  }

  .zoom-controls__button:active {
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.18);
    background-color: var(--button-bg-active);
  }

  .zoom-controls__button:active > .zoom-controls__button--content {
    transform: translateY(2px);
  }
</style>
