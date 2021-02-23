<script lang="ts">
  import Keyframe from "./Keyframe.svelte";
  import NumericInput from "./CoreUI/NumericInput.svelte";
  import EaseInSvg from "./svgs/buttons/easeIn.svg";
  import EaseOutSvg from "./svgs/buttons/easeOut.svg";
  import EaseInOutSvg from "./svgs/buttons/easeInOut.svg";
  import LinearSvg from "./svgs/buttons/linear.svg";

  import PlusSvg from "./svgs/buttons/plus.svg";
  import {
    replaceStylesheetAnimation,
    replaceStylesheetKeyframes,
  } from "./utils/addStylesheetRules";
  import Toggle from "./CoreUI/Toggle.svelte";
  import type { Animation } from "./state/animationStore";

  export let animation: Animation;
  let propertiesOpen = false;

  function addKeyframe(idx: number) {
    const lowerPercent = parseFloat(keyframes[idx][0]);
    const upperPercent = parseFloat(keyframes[idx + 1][0]);

    const percent = Math.round(
      (upperPercent - lowerPercent) / 2 + lowerPercent
    );
    keyframes = keyframes.splice(idx + 1, 0, [`${percent}%`, []]);
    keyframes = keyframes;
  }

  $: ({ keyframes, delay, duration, infinite, easing, name } = animation);

  console.log(keyframes);

  $: replaceStylesheetKeyframes(name, keyframes);

  // Add a reactive reorder
  // $: {
  //   animation = animation.sort((a, b) => {
  //     const aFloat = parseFloat(a[0]) / 100.0;
  //     const bFloat = parseFloat(b[0]) / 100.0;
  //     console.log(aFloat, bFloat);
  //     return aFloat - bFloat;
  //   });
  //   animation = animation;
  //   console.log(animation);
  // }
</script>

<div class="animation-controls">
  <div class="animation-name"><input bind:value={animation.name} /></div>
  <div class="animation-controls__content">
    <div class="control-row">
      <Toggle
        label="Infinite"
        bind:toggled={animation.infinite}
        initialValue={infinite}
      />
    </div>
    <div class="vertical-spacer-1" />
    <div class="control-row">
      <label>Duration</label><NumericInput
        initialValue={duration}
        stepValue={0.1}
        bind:value={animation.duration}
      />
    </div>
    <div class="vertical-spacer-1" />
    <div class="control-row">
      <label>Delay</label><NumericInput
        initialValue={delay}
        stepValue={0.1}
        bind:value={animation.delay}
      />
    </div>
    <div class="vertical-spacer-1" />
    <label>Easing</label>
    <div class="easing-buttons">
      <button
        class="ease-button"
        data-tooltip="Linear"
        aria-label="Linear"
        on:click={() => (animation.easing = "linear")}><LinearSvg /></button
      >
      <button
        class="ease-button"
        data-tooltip="Ease In"
        aria-label="Ease In"
        on:click={() => (animation.easing = "ease-in")}><EaseInSvg /></button
      >
      <button
        class="ease-button"
        data-tooltip="Ease Out"
        aria-label="Ease Out"
        on:click={() => (animation.easing = "ease-out")}><EaseOutSvg /></button
      >
      <button
        class="ease-button"
        data-tooltip="Ease In Out"
        aria-label="Ease In Out"
        on:click={() => (animation.easing = "ease-in-out")}
        ><EaseInOutSvg /></button
      >
    </div>
    <div class="vertical-spacer-1" />
    <div>
      <div class="keyframes-row">
        <h3>@Keyframes</h3>
      </div>
      {#each animation.keyframes as keyframe, i (keyframe[0])}
        <Keyframe
          bind:keyframeArray={animation.keyframes[i]}
          initialKeyframe={animation.keyframes[i]}
          animationDuration={duration}
        />
        {#if i < animation.keyframes.length - 1}
          <button class="add-keyframe" on:click={() => addKeyframe(i)}
            ><PlusSvg /><span>ADD KEYFRAME</span></button
          >
        {/if}
      {/each}
    </div>
  </div>
</div>

<!-- </div> -->
<style>
  .keyframes-row {
    display: flex;
    align-items: center;
  }

  .add-keyframe {
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.3rem 0;
    width: 100%;
    background: transparent;
    box-shadow: none;
    border: 1px dashed var(--controls-border);
    cursor: pointer;
    font-size: 10px;
    font-weight: bold;
    color: #b0b0b0;
  }

  .add-keyframe:hover {
    border: 1px solid var(--controls-border);
  }

  .add-keyframe > span {
    margin-left: 0.3rem;
  }

  .keyframes-row > h3 {
    flex: 1;
  }

  .vertical-spacer-1 {
    margin: 0.4rem 0;
    border-top: 1px dashed #dedede;
  }

  .ease-button {
    background-color: #ffffff;
    width: 30px;
    height: 30px;
    border: 1px solid #c8c8c8;
    box-shadow: var(--button-inset-shadow);
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
    color: #b37094;
    margin: 0;
    margin-bottom: 0.3rem;
    margin-top: 0.5rem;
    font-size: 16px;
  }
  .animation-controls {
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

  .animation-name > input {
    border: 0;
    background-color: transparent;
    margin: 0;
    color: white;
    font-weight: bold;
    flex: 1;
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
