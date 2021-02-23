<script lang="ts">
  import { animations } from "./state/animationStore";
  import AnimationControls from "./AnimationControls.svelte";
  import { replaceStylesheetAnimation } from "./utils/addStylesheetRules";

  $: replaceStylesheetAnimation($animations);
</script>

{#each $animations as animation, i}
  <AnimationControls bind:animation={$animations[i]} />
{/each}
