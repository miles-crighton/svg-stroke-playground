<script lang="ts">
  import { get } from "svelte/store";

  import PrismJs from "./PrismJS.svelte";
  import { animations } from "./state/animationStore";
  import type { Animation } from "./state/animationStore";
  import {
    generateAnimationString,
    generateKeyframeString,
    generateSvgString,
  } from "./utils/addStylesheetRules";

  function getKeyframeString(i: number) {
    const store = $animations[i];
    const animation: Animation = get(store);
    return generateKeyframeString(animation.name, animation.keyframes);
  }

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
{#each $animations as animation, i}
  <PrismJs language="css" code={getKeyframeString(i)} />
{/each}
<PrismJs language="html" code={generateSvgString()} />
<PrismJs
  language="html"
  code={generateAnimationString(
    $animations.reduce((acc, store) => [...acc, get(store)], [])
  )}
/>
<button on:click={() => updateClipboard("djasiodsajdiojas")}
  >djasiodsajdiojas</button
>
