<script lang="ts">
  import ShapeButton from "./ShapeButton.svelte";
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
  let svg;
  $: {
    console.log(strokeDashOffset, svgCode);
    var parser = new DOMParser();
    let doc: Document;

    let tempSvg = `<svg xmlns="http://www.w3.org/2000/svg">${svgCode}</svg>`;

    doc = parser.parseFromString(tempSvg, "image/svg+xml");

    var failed = doc.documentElement.nodeName.indexOf("parsererror") > -1;

    let svgNode = doc.firstChild.firstChild as Element; // Document => <Svg /> => <circle />

    svgNode.setAttribute("stroke-dashoffset", strokeDashOffset.toString());
    svgNode.setAttribute("stroke-dasharray", strokeDashArray.toString());

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

  let styleEl = document.createElement("style");

  document.head.appendChild(styleEl);

  function addStylesheetRules(rules: Array<[string, Array<string>]>) {
    // Grab style element's sheet
    var styleSheet = styleEl.sheet;

    for (var i = 0; i < rules.length; i++) {
      var j = 1,
        rule = rules[i],
        selector = rule[0],
        propStr = "";
      // If the second argument of a rule is an array of arrays, correct our variables.
      if (Array.isArray(rule[1][0])) {
        rule = rule[1];
        j = 0;
      }

      for (var pl = rule.length; j < pl; j++) {
        var prop = rule[j];
        propStr +=
          prop[0] + ": " + prop[1] + (prop[2] ? " !important" : "") + ";\n";
      }

      // Insert CSS Rule
      styleSheet.insertRule(
        selector + "{" + propStr + "}",
        styleSheet.cssRules.length
      );
    }
  }
</script>

<aside>
  <svg
    height="200px"
    width="200px"
    viewBox="0 0 200 200"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    bind:this={svg}
  />
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
  <textarea bind:value={svgCode} />
  <label for="dash-offset">Dash Offset</label>
  <input
    type="range"
    id="dash-offset"
    name="dash-offset"
    min="0"
    max="200"
    bind:value={strokeDashOffset}
  />
  <label for="dash-array">dash-array</label>
  <input
    type="range"
    id="dash-array"
    name="dash-array"
    min="0"
    max="200"
    bind:value={strokeDashArray}
  />
  <input type="number" bind:value={strokeDashArray} min="0" max="200" />
  {#each shapes as shape}
    <ShapeButton on:click={() => changeDefaultShape(shape)} {shape} />
  {/each}
</aside>

<!-- <circle id="Oval" cx="100" cy="100" r="50" stroke="#787878" stroke-width="3"fill="none"></circle> -->
<style>
  textarea {
    min-height: 120px;
    width: 100%;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
  }
  aside {
    background-color: #f3f3f3;
    width: 310px;
    border-left: 1px solid #d5d5d5;
    padding: 1rem;
    box-sizing: border-box;
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
