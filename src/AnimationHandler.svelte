<script lang="ts">
  import { animations } from "./state/animationStore";
  import AnimationControls from "./AnimationControls.svelte";
  console.log(animations);

  // $: console.log($animations);
</script>

{#each $animations as animation, i}
  <AnimationControls bind:animation={$animations[i]} />
{/each}
