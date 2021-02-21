<script lang="ts">
  import { animations } from "./state/animationStore";
  import AnimationControls from "./AnimationControls.svelte";
</script>

{#each $animations as animation, i}
  <AnimationControls bind:animation={$animations[i]} />
{/each}
