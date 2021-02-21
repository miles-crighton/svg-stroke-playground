<script lang="ts">
  import PrismJs from "./PrismJS.svelte";
  import { animations } from "./state/animationStore";
  import { generateKeyframeString } from "./utils/addStylesheetRules";

  export let showCopied = null;
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

<h1>HELLO MODAL</h1>

{#if showCopied}
  <div>{showCopied}</div>
{/if}
{#each $animations as animation}
  <PrismJs
    language="css"
    code={generateKeyframeString(animation.name, animation.keyframes)}
  />
{/each}
<button on:click={() => updateClipboard("djasiodsajdiojas")}
  >djasiodsajdiojas</button
>
