<script lang="ts">
  import CircleSvg from "../svgs/circle.svg";
  import EllipseSvg from "../svgs/ellipse.svg";
  import RectSvg from "../svgs/rect.svg";
  import LineSvg from "../svgs/line.svg";
  import PolylineSvg from "../svgs/polyline.svg";
  import PolygonSvg from "../svgs/polygon.svg";
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

<button on:click data-tooltip={tooltip} aria-label={tooltip}
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
    box-shadow: var(--button-inset-shadow);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button--contents {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:active {
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.13);
    background-color: #f2f2f2;
  }

  button:focus-visible {
    box-shadow: 0 0 0 2px blue;
  }

  button:active > .button--contents {
    transform: translateY(2px);
  }
</style>
