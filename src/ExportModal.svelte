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
</script>

<!-- <h2>Export your svg animations</h2> -->

{#each $animations as animation, i}
  <PrismJs
    language="css"
    code={getKeyframeString(i)}
    header={`CSS Keyframes ${i + 1}`}
  />
{/each}
<PrismJs
  language="css"
  header={`CSS Animation Property`}
  code={generateAnimationString(
    $animations.reduce((acc, store) => [...acc, get(store)], [])
  )}
/>

<PrismJs language="markup" header={`Svg Markup`} code={generateSvgString()} />
