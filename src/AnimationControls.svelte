<script lang="ts">
  import Keyframe from "./Keyframe.svelte";
  import NumericInput from "./NumericInput.svelte";
  import { replaceStylesheetAnimation } from "./utils/addStylesheetRules";

  let animation = [
    ["0%", ["stroke-dashoffset", "200"]],
    ["100%", ["stroke-dashoffset", "0"]],
  ];
  export let delay = 0;
  export let duration = 1;
  export let infinite = true;
  export let animationName = "Animation 1";

  let styleEl = document.createElement("style");

  document.head.appendChild(styleEl);

  $: replaceStylesheetAnimation(animation, styleEl);

  $: {
    document.documentElement.style.setProperty(
      "--animation-delay",
      `${delay}s`
    );
    document.documentElement.style.setProperty(
      "--animation-duration",
      `${duration}s`
    );
    document.documentElement.style.setProperty(
      "--animation-infinite",
      `${infinite ? "infinite" : 1}`
    );
  }

  // Add a reactive reorder
  $: {
    animation = animation.sort((a, b) => {
      const aFloat = parseFloat(a[0]) / 100.0;
      const bFloat = parseFloat(b[0]) / 100.0;
      console.log(aFloat, bFloat);
      return aFloat - bFloat;
    });
    animation = animation;
    console.log(animation);
  }
</script>

<div class="animation-controls">
  <div class="animation-name">{animationName}</div>
  <div class="control-row"><label>Infinite</label></div>
  <div class="control-row">
    <label>Duration</label><NumericInput
      initialValue={duration}
      stepValue={0.1}
      bind:value={duration}
    />
  </div>
  <div class="control-row">
    <label>Delay</label><NumericInput
      initialValue={delay}
      stepValue={0.1}
      bind:value={delay}
    />
  </div>
  <div>
    <h3>@Keyframes</h3>
    {#each animation as keyframe, i (keyframe[0])}
      <Keyframe
        bind:keyframeArray={animation[i]}
        initialKeyframe={animation[i]}
        animationDuration={duration}
      />
    {/each}
  </div>
</div>

<style>
  h3 {
    font-size: 14px;
    color: #b37094;
    margin: 0;
    margin-bottom: 0.3rem;
    margin-top: 1rem;
  }
  .animation-controls {
    padding: 0.8rem;
    border: 1px solid #d6d6d6;
    border-radius: 12px;
  }
  .animation-name {
    background-color: #e3527c;
    border-radius: 5px;
    color: white;
    text-align: center;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    margin-bottom: 0.8rem;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.12);
  }

  label {
    font-weight: 500;
    color: #6e1e49;
  }

  .control-row {
    display: flex;
    align-items: center;
  }

  .control-row > label {
    flex: 1;
    font-size: 16px;
  }
</style>
