<script>
  import { onMount } from "svelte";
  import Prism from "prismjs";
  import ClipboardSvg from "../svgs/buttons/clipboard.svg";
  import { fly, fade } from "svelte/transition";

  export let language;
  export let code;
  export let header;

  onMount(() => {
    let script = document.createElement("script");
    script.src =
      "https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism.js";
    document.head.append(script);

    script.onload = function () {
      let langJS = false;
      let lang_script;
      let lang_module;

      // This switch statement, evaluates what language is being used, if one of a key language is being used, it will
      // load the proper Prisim support tool, like Python requires "prism-python.js" to modify the raw code so that
      // Prisim can render it properly.
      switch (language) {
        case "json":
          lang_module = "https://prismjs.com/components/prism-json.js";
          langJS = true;
          break;

        case "python":
          lang_module = "https://prismjs.com/components/prism-python.js";
          langJS = true;
          break;

        case "rust":
          lang_module = "https://prismjs.com/components/prism-rust.js";
          langJS = true;
          break;

        case "r":
          lang_module = "https://prismjs.com/components/prism-r.js";
          langJS = true;
          break;

        case "sql":
          lang_module = "https://prismjs.com/components/prism-sql.js";
          langJS = true;
          break;
      }

      if (langJS == true) {
        lang_script = document.createElement("script");
        lang_script.src = lang_module;
        lang_script.async = true;
        document.head.append(lang_script);

        lang_script.onload = () => {
          Prism.highlightAll();
        };
      } else {
        Prism.highlightAll();
      }
    };
  });

  let showCopied = null;
  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      function () {
        showCopied = "Successfully Copied";
        setTimeout(() => (showCopied = null), 1000);
        /* clipboard successfully set */
      },
      function () {
        showCopied = "Failed to Copy";
        setTimeout(() => (showCopied = null), 1000);
        /* clipboard write failed */
      }
    );
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css"
  />
</svelte:head>

<h3>{header}</h3>
<div class="w3-container container">
  <!-- <h2>{header}</h2> -->
  <pre><code class="language-{language}">{code}</code></pre>
  <div>
    {#if showCopied}
      <div class="copied-notif" in:fly={{ y: 5 }} out:fade>
        Copied to clipboard!
      </div>
    {/if}
    <button on:click={() => updateClipboard(code)}
      ><span> Copy </span><ClipboardSvg /></button
    >
  </div>
</div>

<style>
  .container {
    position: relative;
  }

  h3 {
    color: var(--label-color);
    margin-bottom: 0.8rem;
    margin-top: 1.2rem;
  }

  .copied-notif {
    position: absolute;
    margin: 0 auto;
    top: -1.5rem;
    right: 0.6rem;
    color: white;
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    background-color: #000;
    font-weight: bold;
    background: linear-gradient(45deg, #7d1d43, #5c1646);
  }

  button {
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  }

  button > span {
    margin-right: 0.5rem;
  }
</style>
