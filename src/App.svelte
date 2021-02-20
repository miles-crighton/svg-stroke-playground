<script lang="ts">
  import Footer from "./Footer.svelte";
  import Aside from "./Sidebar.svelte";
  import ZoomControls from "./ZoomControls.svelte";
  import GithubCorner from "./svgs/githubCorner.svg";
  let zoomLevel = 1;
  let svg;
  export let svgElement: Element;
  export let name: string;
  let width = 500;
  let height = 500;
  let zoomWidth = width / zoomLevel;
  let zoomValue = width / 2 - zoomWidth / 2;

  $: {
    if (svg) {
      if (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svgElement.setAttribute("class", "svgElement");
      svg.append(svgElement);
    }
  }

  $: {
    zoomWidth = width / zoomLevel;
    zoomValue = width / 2 - zoomWidth / 2;
  }
</script>

<main>
  <div class="contents">
    <div class="svg-wrapper">
      <svg
        height={height * zoomLevel}
        width={width * zoomLevel}
        viewBox={`${0} ${0} ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        bind:this={svg}
        class="primary-svg"
      />
    </div>
    <ZoomControls bind:zoomLevel />
    <!-- <Footer /> -->
    <a href="https://www.github.com">
      <GithubCorner />
    </a>
  </div>
  <Aside bind:svgElement bind:width bind:height />
</main>

<svelte:head>
  <style>
    :root {
      --animation-duration: 1s;
      --animation-delay: 0s;
      --animation-state: running;

      --label-color: #3e3e3e;
      --controls-bg: #f3f3f3;
      --controls-border: #d1d1d1;

      --button-bg: #ffffff;
      --button-border: #d1d1d1;
      --button-bg-active: #f2f2f2;

      --primary: #fb6c96;
    }
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

    .svgElement {
      animation: my-animation var(--animation-duration) var(--animation-delay)
        var(--animation-state) var(--animation-easing) infinite;
    }

    .github-corner {
      position: absolute;
      left: 0;
      top: 0;
    }

    .github-corner:hover #octocat-arm {
      animation: octocat-wave 0.9s;
      transform-origin: center;
    }

    @keyframes octocat-wave {
      0% {
        transform: rotate(0deg);
      }
      30% {
        transform: rotate(-10deg);
      }
      60% {
        transform: rotate(5deg);
      }
      80% {
        transform: rotate(-6deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  </style>
</svelte:head>

<style>
  @font-face {
    name: "Funkydori";
    src: url("/Funkydori.otf");
  }

  :global(body) {
    @import url("https://fonts.googleapis.com/css2?family=Cabin:wght@400;600;700&display=swap");

    padding: 0;
    font-family: "Cabin", sans-serif;
  }

  main {
    display: flex;
    height: 100vh;
  }

  .svg-wrapper {
    border-top: 10px solid var(--primary);
    border-left: 10px solid var(--primary);
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .primary-svg {
    border: 1px dashed var(--controls-border);
  }

  .contents {
    display: flex;
    flex-direction: column;
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
