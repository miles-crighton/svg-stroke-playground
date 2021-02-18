<script lang="ts">
  import Footer from "./Footer.svelte";
  import Aside from "./Sidebar.svelte";
  import ZoomControls from "./ZoomControls.svelte";
  let zoomLevel = 1;
  let svg;
  export let svgElement: Element;
  export let name: string;

  $: {
    if (svg) {
      if (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svg.append(svgElement);
    }
  }
</script>

<main>
  <div class="contents">
    <svg
      height="100%"
      width="100%"
      viewBox={`0 0 ${200 / zoomLevel} ${200 / zoomLevel}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      bind:this={svg}
    />
    <ZoomControls bind:zoomLevel />
    <Footer />
  </div>
  <Aside bind:svgElement />
</main>

<svelte:head>
  <style>
    /*This would all go into the global.css file*/
    [data-tooltip] {
      position: relative;
      z-index: 2;
      display: block;
    }

    [data-tooltip]:before,
    [data-tooltip]:after {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      transition: 0.2s ease-out;
      transform: translate(-50%, 5px);
    }

    [data-tooltip]:before {
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-bottom: 5px;
      padding: 7px 20px 7px 12px;
      width: 100%;
      min-width: 70px;
      max-width: 250px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      background-color: #000;
      background: linear-gradient(45deg, #7d1d43, #5c1646);
      color: #fff;
      content: attr(data-tooltip);
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      line-height: 1.2;
      transition: 0.2s ease-out;
      white-space: pre;
    }

    [data-tooltip]:after {
      position: absolute;
      bottom: 100%;
      left: 50%;
      width: 0;
      border-top: 5px solid #000;
      border-top: 5px solid #7d1d43;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      content: " ";
      font-size: 0;
      line-height: 0;
    }

    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
      visibility: visible;
      opacity: 1;
      transform: translate(-50%, 0);
    }
    [data-tooltip="false"]:hover:before,
    [data-tooltip="false"]:hover:after {
      visibility: hidden;
      opacity: 0;
    }
  </style>
</svelte:head>

<style>
  @font-face {
    name: "Funkydori";
    src: url("/Funkydori.otf");
  }

  :global(body) {
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

    padding: 0;
    font-family: "Inter", sans-serif;
  }

  main {
    display: flex;
    height: 100vh;
  }

  .contents {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
  }

  h1 {
    font-family: "Funkydori";
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
