<script lang="ts">
  type Shape = "circle" | "line" | "polyline" | "rect" | "ellipse" | "polygon";
  export let shape: Shape;
  export let tooltip: boolean | string = false;
</script>

<button on:click data-tooltip={tooltip}>{shape}</button>

<style>
  button {
    background-color: #ffffff;
    width: 45px;
    height: 45px;
    border: 1px solid #c8c8c8;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
  }
</style>
