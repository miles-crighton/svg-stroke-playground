<script lang="ts">
  export let zoomLevel = 1;

  const increaseZoom = () => {
    zoomLevel = Math.floor(zoomLevel * 100 * 1.2) / 100;
  };

  const decreaseZoom = () => {
    zoomLevel = Math.floor((zoomLevel * 100) / 1.2) / 100;
  };
</script>

<div class="zoom-controls">
  <button class="zoom-controls__button" on:click={increaseZoom}
    >ZOOM IN
  </button>
  <button class="zoom-controls__button" on:click={decreaseZoom}>UNZOOM</button>
  <span>{zoomLevel * 100}%</span>
</div>

<style>
  .zoom-controls {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10%;
    display: flex;
    background-color: #fff;
    border: 1px solid #d5d5d5;
    box-shadow: 0 0 22px 1px rgba(0, 0, 0, 0.1),
      inset 0 -2px 3px rgba(0, 0, 0, 0.08);
  }

  .zoom-controls__button {
    background-color: #f7f7f7;
    width: 45px;
    height: 45px;
    border: 1px solid #c8c8c8;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
  }
</style>
