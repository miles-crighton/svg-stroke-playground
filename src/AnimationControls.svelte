<script lang="ts">
  import Keyframe from "./Keyframe.svelte";
  import NumericInput from "./NumericInput.svelte";
  import EaseInSvg from "./svgs/buttons/easeIn.svg";
  import EaseOutSvg from "./svgs/buttons/easeOut.svg";
  import EaseInOutSvg from "./svgs/buttons/easeInOut.svg";
  import LinearSvg from "./svgs/buttons/linear.svg";
  import { replaceStylesheetAnimation } from "./utils/addStylesheetRules";
  import Toggle from "./CoreUI/Toggle.svelte";

  let animation = [
    ["0%", ["stroke-dashoffset", "200"]],
    ["100%", ["stroke-dashoffset", "0"]],
  ];
  let activeProperties = {
    strokeDashOffset: true,
    strokeDashArray: false,
    color: false,
  };
  export let delay = 0;
  export let duration = 1;
  export let infinite = true;
  export let animationName = "Animation 1";
  export let easing = "linear";

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
    document.documentElement.style.setProperty(
      "--animation-easing",
      `${easing}`
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
  <div class="animation-controls__content">
    <div class="control-row">
      <Toggle
        label="Infinite"
        bind:toggled={infinite}
        initialValue={infinite}
      />
    </div>
    <div class="vertical-spacer-1" />
    <div class="control-row">
      <label>Duration</label><NumericInput
        initialValue={duration}
        stepValue={0.1}
        bind:value={duration}
      />
    </div>
    <div class="vertical-spacer-1" />
    <div class="control-row">
      <label>Delay</label><NumericInput
        initialValue={delay}
        stepValue={0.1}
        bind:value={delay}
      />
    </div>
    <label>Easing</label>
    <div class="easing-buttons">
      <button class="ease-button" on:click={() => (easing = "linear")}
        ><LinearSvg /></button
      >
      <button class="ease-button" on:click={() => (easing = "ease-in")}
        ><EaseInSvg /></button
      >
      <button class="ease-button" on:click={() => (easing = "ease-out")}
        ><EaseOutSvg /></button
      >
      <button class="ease-button" on:click={() => (easing = "ease-in-out")}
        ><EaseInOutSvg /></button
      >
    </div>
    <div>
      <h3>@Keyframes</h3>
      {#each animation as keyframe, i (keyframe[0])}
        <Keyframe
          bind:keyframeArray={animation[i]}
          {activeProperties}
          initialKeyframe={animation[i]}
          animationDuration={duration}
        />
      {/each}
    </div>
  </div>
</div>

<style>
  .ease-button {
    background-color: #ffffff;
    width: 30px;
    height: 30px;
    border: 1px solid #c8c8c8;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.3rem;
  }
  .easing-buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.4rem;
  }
  h3 {
    font-size: 14px;
    color: #b37094;
    margin: 0;
    margin-bottom: 0.3rem;
    margin-top: 1rem;
  }
  .animation-controls {
  }
  .vertical-spacer-1 {
    height: 0.5rem;
  }
  .animation-controls__content {
    border: 1px dashed #d6d6d6;
    border-top: 0;
    padding: 0.8rem;
    border-radius: 0 0 12px 12px;
  }
  .animation-name {
    background-color: #e3527c;
    border-radius: 12px 12px 0 0;
    color: white;
    text-align: center;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    padding: 0 0.8rem;
    box-sizing: border-box;
    font-weight: 500;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.12);
  }

  label {
    font-weight: 600;
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
