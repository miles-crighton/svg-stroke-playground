<script lang="ts">
  import CircleSvg from "./svgs/circle.svg";
  import EllipseSvg from "./svgs/ellipse.svg";
  import RectSvg from "./svgs/rect.svg";
  import LineSvg from "./svgs/line.svg";
  import PolylineSvg from "./svgs/polyline.svg";
  import PolygonSvg from "./svgs/polygon.svg";
  type Shape = "circle" | "line" | "polyline" | "rect" | "ellipse" | "polygon";
  const shapeMap = {
    circle: CircleSvg,
    rect: RectSvg,
    ellipse: EllipseSvg,
    line: LineSvg,
    polyline: PolylineSvg,
    polygon: PolygonSvg,
  };
  export let shape: Shape;
  export let tooltip: boolean | string = false;
</script>

<button on:click data-tooltip={tooltip}
  ><div class="button--contents">
    <svelte:component this={shapeMap[shape] ? shapeMap[shape] : null} />
  </div></button
>

<style>
  button {
    background-color: #ffffff;
    width: 35px;
    height: 35px;
    border: 1px solid #c8c8c8;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:active {
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.18);
    background-color: #f2f2f2;
  }

  button:active > .button--contents {
    transform: translateY(2px);
  }
</style>
