<script lang="ts">
  import { derived, get } from "svelte/store";
  import { animations, addAnimation } from "./state/animationStore";
  import AnimationControls from "./AnimationControls.svelte";
  import { replaceStylesheetAnimation } from "./utils/addStylesheetRules";

  let animationCount;
  let derivedAnimations;

  $: animationCount = $animations;

  // // Will never react anyway because won't update to subscribe to new added stores...
  // $: animationCount.forEach((store, idx) => {
  //   console.log(idx);
  //   store.subscribe(() => {
  //     derivedAnimations += 1;
  //     console.log("SUBSCRIBED");
  //   });
  // });

  $: {
    // BUG: Currently does not reactively update when single animation value changes
    console.log(derivedAnimations);
    const animationS = $animations.reduce(
      (acc, store) => [...acc, get(store)],
      []
    );

    console.log(animationS);
    replaceStylesheetAnimation(animationS);
  }
</script>

{#each animationCount as animation, i}
  <AnimationControls idx={i} />
{/each}
<button on:click={addAnimation} />
