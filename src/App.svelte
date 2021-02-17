<script lang="ts">
  import Footer from "./Footer.svelte";
  import Aside from "./Sidebar.svelte";
  export let svgCode: string;
  export let name: string;
</script>

<main>
  <div class="contents">
    <svg
      height="200px"
      width="200px"
      viewBox="0 0 200 200"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">{@html svgCode}</svg
    >
    <Footer />
  </div>
  <Aside bind:svgCode />
</main>

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
