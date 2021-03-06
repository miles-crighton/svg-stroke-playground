<script lang="ts">
  import ZoomInSvg from "../svgs/zoom-in.svg";
  import ZoomOutSvg from "../svgs/zoom-out.svg";
  import ZoomResetSvg from "../svgs/zoom-reset.svg";
  import PlaySvg from "../svgs/buttons/play.svg";
  import PauseSvg from "../svgs/buttons/pause.svg";
  import RestartSvg from "../svgs/buttons/restart.svg";
  import ExportSvg from "../svgs/buttons/export.svg";
  import PercentInput from "../CoreUI/PercentInput.svelte";
  import ExportModal from "../molecules/ExportModal.svelte";
  import Footer from "../atoms/Footer.svelte";
  import { getContext } from "svelte";
  import { resetStylesheetAnimation } from "../utils/addStylesheetRules";
  const { open } = getContext("simple-modal");

  export let zoomLevel = 1;
  export let zoomLevelPercent = Math.round(zoomLevel * 100);
  export let playing = true;

  const playAnimation = () => (playing = true);
  const pauseAnimation = () => (playing = false);

  const increaseZoom = () => {
    zoomLevelPercent = Math.floor(zoomLevelPercent * 1.2);
  };

  const decreaseZoom = () => {
    zoomLevelPercent = Math.floor(zoomLevelPercent / 1.2);
  };

  const resetZoom = () => (zoomLevelPercent = 100);

  $: {
    document.documentElement.style.setProperty(
      "--animation-state",
      `${playing ? "running" : "paused"}`
    );
  }

  $: {
    zoomLevel = zoomLevelPercent / 100;
  }

  const showExportModal = () => {
    open(ExportModal, { message: "It's a popup!" });
  };

  const resetAnimation = () => resetStylesheetAnimation();
</script>

<div class="zoom-controls">
  <Footer />
  <div>
    <div class="buttons-label">Animation</div>
    <div class="button-row">
      <button
        class="zoom-controls__button"
        on:click={playAnimation}
        data-tooltip="Play Animation"
        aria-label="Play Animation"
        ><div class="zoom-controls__button--content"><PlaySvg /></div>
      </button>
      <button
        class="zoom-controls__button"
        on:click={pauseAnimation}
        data-tooltip="Pause Animation"
        aria-label="Pause Animation"
        ><div class="zoom-controls__button--content"><PauseSvg /></div></button
      >
      <button
        class="zoom-controls__button"
        on:click={resetAnimation}
        data-tooltip="Restart Animation"
        aria-label="Restart Animation"
        ><div class="zoom-controls__button--content">
          <RestartSvg />
        </div></button
      >
    </div>
  </div>
  <div class="border-div" />
  <div>
    <div class="buttons-label">Zoom</div>
    <div class="button-row">
      <button
        class="zoom-controls__button"
        on:click={increaseZoom}
        data-tooltip="Zoom In"
        aria-label="Zoom In"
        ><div class="zoom-controls__button--content"><ZoomInSvg /></div>
      </button>
      <button
        class="zoom-controls__button"
        on:click={decreaseZoom}
        data-tooltip="Zoom out"
        aria-label="Zoom out"
        ><div class="zoom-controls__button--content">
          <ZoomOutSvg />
        </div></button
      >
      <button
        class="zoom-controls__button"
        on:click={resetZoom}
        data-tooltip="Reset Zoom"
        aria-label="Reset Zoom"
        ><div class="zoom-controls__button--content">
          <ZoomResetSvg />
        </div></button
      >
      <PercentInput
        initialValue={Math.round(zoomLevel * 100)}
        max={1000}
        min={10}
        onSubmit={(value) => (zoomLevelPercent = value)}
      />
    </div>
  </div>
  <button class="export-button" on:click={showExportModal}
    ><ExportSvg /><span>Export Code</span></button
  >
</div>

<style>
  .export-button {
    position: absolute;
    right: 1rem;
    padding: 0.5rem 1.5rem;
  }

  .export-button > span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
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
    /* height: 17px; */
    display: flex;
    align-items: center;
  }

  .zoom-controls__button:active {
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.18);
    background-color: var(--button-bg-active);
  }

  .zoom-controls__button:active > .zoom-controls__button--content {
    transform: translateY(2px);
  }
</style>
