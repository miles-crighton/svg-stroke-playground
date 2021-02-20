<script lang="ts">
  import AnimationControls from "./AnimationControls.svelte";
  import Slider from "./CoreUI/Slider.svelte";
  import NumericInput from "./NumericInput.svelte";
  import RangeNumericInput from "./RangeNumericInput.svelte";
  import ShapeButton from "./ShapeButton.svelte";
  import StrokeDashArray from "./StrokeDashArray.svelte";
  type Shape = "circle" | "line" | "polyline" | "rect" | "ellipse" | "polygon";
  const shapes: Array<Shape> = [
    "circle",
    "line",
    "polyline",
    "rect",
    "ellipse",
    "polygon",
  ];

  const shapePresets = {
    circle: `<circle id="Oval" cx="100" cy="100" r="50" stroke="#787878" stroke-width="3" fill="none" />`,
    rect: `<rect width="100" height="100" x="50" y="50" stroke="#787878" stroke-width="3" fill="none" />`,
    ellipse: `<ellipse cx="100" cy="100" rx="80" ry="50" stroke="#787878" stroke-width="3" fill="none" />`,
    polygon: `<polygon points="100,10 40,198 190,78 10,78 160,198" stroke="#787878" stroke-width="3" fill="none" />`,
    polyline: `<polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" stroke="#787878" stroke-width="3" fill="none"/>`,
    line: `<line x1="0" y1="0" x2="200" y2="200" stroke="#787878" stroke-width="3" fill="none" />`,
    path: `<path d="M150 0 L75 200 L225 200 Z" stroke="#787878" stroke-width="3" fill="none"/>`,
  };

  export let svgCode = `<circle id="Oval" cx="100" cy="100" r="50" stroke="#787878" stroke-width="3" fill="none"></circle>`;
  export let strokeDashOffset = 0;
  export let strokeDashArray = "1";
  export let svgElement: Element;
  let svg;
  $: {
    var parser = new DOMParser();
    let doc: Document;

    let tempSvg = `<svg xmlns="http://www.w3.org/2000/svg">${svgCode}</svg>`;

    doc = parser.parseFromString(tempSvg, "image/svg+xml");

    var failed = doc.documentElement.nodeName.indexOf("parsererror") > -1;

    let svgNode = doc.firstChild.firstChild as Element; // Document => <Svg /> => <circle />

    svgNode.setAttribute("stroke-dashoffset", strokeDashOffset.toString());
    svgNode.setAttribute("stroke-dasharray", strokeDashArray.toString());

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
  <h2 class="gradient">Svg</h2>
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
  <RangeNumericInput bind:value={strokeDashOffset} label="stroke-dashoffset" />
  <div class="vertical-spacer-1" />
  <StrokeDashArray bind:stringValue={strokeDashArray} />
  <div class="vertical-spacer-1" />
  <h2 class="gradient">Animation</h2>
  <AnimationControls />
</aside>

<style>
  .shape-buttons {
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    font-family: "Funkydori";
    font-size: 32px;
    text-align: center;
    margin: 0.5rem;
  }

  .vertical-spacer-1 {
    height: 1rem;
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
    font-weight: 500;
    color: #6e1e49;
  }
  textarea {
    min-height: 120px;
    width: 100%;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
  }
  aside {
    background-color: #f3f3f3;
    margin: 1.5rem;
    border-radius: 12px;
    width: 350px;
    border: 1px solid #d5d5d5;
    padding: 1rem 1.5rem;
    box-sizing: border-box;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .header {
    font-family: "Funkydori";
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
