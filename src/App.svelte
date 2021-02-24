<script lang="ts">
  import Aside from "./organisms/Sidebar.svelte";
  import ZoomControls from "./organisms/ZoomControls.svelte";
  import GithubCorner from "./svgs/githubCorner.svg";
  import GlobalStyles from "./GlobalStyles.svelte";
  import Modal from "svelte-simple-modal";
  import { svgHeight, svgWidth } from "./state/svgStore";
  let zoomLevel = 1;
  let svg;
  export let svgElement: Element;

  $: {
    if (svg) {
      if (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      svgElement.setAttribute("class", "svgElement");
      svg.append(svgElement);
    }
  }
</script>

<GlobalStyles />
<Modal>
  <main>
    <div class="contents">
      <div class="svg-wrapper">
        <svg
          height={$svgHeight * zoomLevel}
          width={$svgWidth * zoomLevel}
          viewBox={`${0} ${0} ${$svgWidth} ${$svgHeight}`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          bind:this={svg}
          class="primary-svg"
          id="primary-svg"
        />
      </div>
      <ZoomControls bind:zoomLevel />
      <!-- <Footer /> -->
      <a href="https://github.com/miles-crighton/svg-stroke-playground">
        <GithubCorner />
      </a>
    </div>
    <Aside bind:svgElement />
  </main>
</Modal>

<style>
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
    overflow: hidden;
    position: relative;

    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cec6db' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  }

  .svg-wrapper::before {
    content: "";
    width: 0;
    height: 0;
    border-right: 50px solid transparent;
    border-bottom: 50px solid var(--primary);
    position: absolute;
    left: 0rem;
    bottom: 0rem;
  }

  .svg-wrapper::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    border-top: 60px solid var(--primary);
    position: absolute;
    right: 0rem;
    top: 0rem;
  }

  .primary-svg {
    border: 1px dashed #e9aeee;
    background: white;
  }

  .contents {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    height: 100vh;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
