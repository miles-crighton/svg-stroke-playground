<script lang="ts">
  import { animations } from "./state/animationStore";
  import AnimationControls from "./AnimationControls.svelte";
  import { replaceStylesheetAnimation } from "./utils/addStylesheetRules";

  let styleEl = document.createElement("style");

  document.head.appendChild(styleEl);

  $: replaceStylesheetAnimation($animations, styleEl);
</script>

{#each $animations as animation, i}
  <AnimationControls bind:animation={$animations[i]} />
{/each}
