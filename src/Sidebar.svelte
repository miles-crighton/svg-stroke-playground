<script lang="ts">
  import AnimationControls from "./AnimationControls.svelte";
  import ColorPicker from "./CoreUI/ColorPicker.svelte";
  import NumericInput from "./CoreUI/NumericInput.svelte";
  import SvgTitle from "./svgs/svgTitle.svg";
  import AnimationTitle from "./svgs/animationsTitle.svg";
  import RangeNumericInput from "./CoreUI/RangeNumericInput.svelte";
  import ShapeButton from "./ShapeButton.svelte";
  import StrokeDashArray from "./StrokeDashArray.svelte";
  import Linecap from "./Linecap.svelte";
  import ChevronLeftSvg from "./svgs/buttons/chevronLeft.svg";
  import ChevronRightSvg from "./svgs/buttons/chevronRight.svg";
  import {
    svgHeight,
    svgLinecap,
    svgStrokeColor,
    svgStrokeDashArray,
    svgStrokeOffset,
    svgWidth,
  } from "./state/svgStore";
  import shapePresets from "./data/shapePresets";
  import { animations } from "./state/animationStore";
  import AnimationHandler from "./AnimationHandler.svelte";
  type Shape = "circle" | "line" | "polyline" | "rect" | "ellipse" | "polygon";
  const shapes: Array<Shape> = [
    "circle",
    "line",
    "polyline",
    "rect",
    "ellipse",
    "polygon",
  ];

  export let svgCode = shapePresets.circle;
  export let svgElement: Element;
  type Tabs = "Animation" | "Svg";
  let tab: Tabs = "Svg";

  let svg;
  $: {
    var parser = new DOMParser();
    let doc: Document;

    let tempSvg = `<svg xmlns="http://www.w3.org/2000/svg">${svgCode}</svg>`;

    doc = parser.parseFromString(tempSvg, "image/svg+xml");

    var failed = doc.documentElement.nodeName.indexOf("parsererror") > -1;

    let svgNode = doc.firstChild.firstChild as Element; // Document => <Svg /> => <circle />

    svgNode.setAttribute("stroke-dashoffset", $svgStrokeOffset.toString());
    svgNode.setAttribute("stroke-dasharray", $svgStrokeDashArray.toString());
    svgNode.setAttribute("stroke", $svgStrokeColor);
    svgNode.setAttribute("stroke-linecap", $svgLinecap);

    svgElement = svgNode;

    if (svg) {
      if (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.append(svgNode);
    }
  }

  function changeDefaultShape(shape: Shape) {
    svgCode = shapePresets[shape];
  }
</script>

<aside>
  <div class="header">
    {#if tab === "Svg"}
      <SvgTitle /><button
        class="header-button"
        on:click={() => (tab = "Animation")}
        ><ChevronRightSvg /><span>ANIMATION</span></button
      >
    {:else}
      <AnimationTitle /><button
        class="header-button header-button-left"
        on:click={() => (tab = "Svg")}
        ><ChevronLeftSvg /><span>SVG</span></button
      >
    {/if}
  </div>
  {#if tab === "Svg"}
    <div class="contents">
      <div class="control-row">
        <div>
          <label>Width</label><NumericInput
            bind:value={$svgWidth}
            stepValue={25}
          />
        </div>
        <div class="horizontal-spacer-1" />
        <div>
          <label>Height</label><NumericInput
            bind:value={$svgHeight}
            stepValue={25}
          />
        </div>
      </div>
      <div class="vertical-spacer-1" />
      <label>Shape Presets</label>
      <div class="shape-buttons">
        {#each shapes as shape}
          <ShapeButton
            on:click={() => changeDefaultShape(shape)}
            {shape}
            tooltip={`<${shape} />`}
          />
          <span style="width: 8px;" />
        {/each}
      </div>
      <div class="vertical-spacer-1" />
      <label for="svg-code">Svg Code</label>
      <textarea bind:value={svgCode} />
      <div class="vertical-spacer-1" />
      <ColorPicker bind:color={$svgStrokeColor} />
      <div class="vertical-spacer-1" />
      <Linecap bind:linecap={$svgLinecap} />
      <div class="vertical-spacer-1" />
      <RangeNumericInput
        bind:value={$svgStrokeOffset}
        label="stroke-dashoffset"
      />
      <div class="vertical-spacer-1" />
      <StrokeDashArray bind:stringValue={$svgStrokeDashArray} />
    </div>
  {:else}
    <div class="contents">
      <AnimationHandler />
    </div>
  {/if}
</aside>

<style>
  .shape-buttons {
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    font-family: "Funkydori";
    font-size: 34px;
    text-align: center;
    color: white;
    margin: 0;
  }

  .control-row {
    display: flex;
  }

  .vertical-spacer-1 {
    margin: 0.7rem 0;
    border-top: 1px dashed #dedede;
  }

  .horizontal-spacer-1 {
    width: 1rem;
    height: 100%;
  }

  .gradient {
    background-color: #c937b9;
    background-image: linear-gradient(45deg, #f15858, #c937b9);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
  label {
    font-weight: 600;
    color: var(--label-color);
    margin-bottom: 0.5rem;
  }
  textarea {
    min-height: 100px;
    width: 100%;
    box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.13);
    border-radius: 4px;
  }
  aside {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .contents {
    background-color: #f3f3f3;
    width: 350px;
    border: 1px solid #d5d5d5;
    border-top: 0;
    padding: 1rem 1.5rem;
    box-sizing: border-box;
    position: relative;
    flex: 1;
  }

  .header {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#ff749d, #f25c88);
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.15);
    position: relative;
  }

  .header-button {
    color: white;
    font-weight: bold;
    font-size: 12px;
    position: absolute;
    right: 1rem;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    flex-direction: column;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  .header-button-left {
    left: 1rem;
  }

  .header-button span {
    margin-top: 0.2rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
