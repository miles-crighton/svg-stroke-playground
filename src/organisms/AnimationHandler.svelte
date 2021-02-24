<script lang="ts">
  import { derived, get } from "svelte/store";
  import { animations, addAnimation } from "../state/animationStore";
  import AnimationControls from "./AnimationControls.svelte";
  import { replaceStylesheetAnimation } from "../utils/addStylesheetRules";
  import AddAnimationSvg from "../svgs/buttons/addAnimation.svg";

  let animationCount;

  $: animationCount = $animations;

  $: {
    const animationsRaw = $animations.reduce(
      (acc, store) => [...acc, get(store)],
      []
    );
    replaceStylesheetAnimation(animationsRaw);
  }
</script>

{#each animationCount as animation, i}
  <AnimationControls idx={i} />
{/each}
<button on:click={addAnimation}
  ><AddAnimationSvg /><span>Add an Animation</span></button
>

<style>
  button {
    margin: 0 auto;
    padding: 0.5rem 2rem;
  }
  button > span {
    margin-left: 0.5rem;
  }
</style>
