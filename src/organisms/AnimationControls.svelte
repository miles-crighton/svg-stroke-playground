<script lang="ts">
  import Keyframe from "../molecules/Keyframe.svelte";
  import NumericInput from "../CoreUI/NumericInput.svelte";
  import EaseInSvg from "../svgs/buttons/easeIn.svg";
  import EaseOutSvg from "../svgs/buttons/easeOut.svg";
  import EaseInOutSvg from "../svgs/buttons/easeInOut.svg";
  import LinearSvg from "../svgs/buttons/linear.svg";
  import CloseCrossSvg from "../svgs/buttons/close.svg";

  import PlusSvg from "../svgs/buttons/plus.svg";
  import {
    replaceStylesheetAnimation,
    replaceStylesheetKeyframes,
  } from "../utils/addStylesheetRules";
  import Toggle from "../CoreUI/Toggle.svelte";
  import { animations, removeAnimation } from "../state/animationStore";
  import type { Animation } from "../state/animationStore";

  export let idx;
  export let store = $animations[idx];
  export let animation: Animation;

  console.log(store, idx);

  $: animation = $store;

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

  $: replaceStylesheetKeyframes(name, keyframes, idx);

  $: {
    // IMPORTANT: Allows reactivity of parent to replace animation properties
    console.log(keyframes, delay, duration, infinite, easing, name);
    animations.update((n) => n);
  }

  // Add a reactive reorder
  $: {
    animation.keyframes = animation.keyframes.sort((a, b) => {
      const aFloat = parseFloat(a[0]) / 100.0;
      const bFloat = parseFloat(b[0]) / 100.0;
      return aFloat - bFloat;
    });
    animation = animation;
  }
</script>

<div class="animation-controls">
  <div class="animation-name">
    <input bind:value={animation.name} /><button
      class="close-button"
      data-tooltip="Delete Animation"
      aria-label="Delete animation"
      on:click={() => removeAnimation(idx)}><CloseCrossSvg /></button
    >
  </div>
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
    <label class="top-label">Easing</label>
    <div class="easing-buttons">
      <button
        class="ease-button"
        data-tooltip="Linear"
        aria-label="Linear"
        on:click={() => (animation.easing = "linear")}
        ><div class="button--contents"><LinearSvg /></div></button
      >
      <button
        class="ease-button"
        data-tooltip="Ease In"
        aria-label="Ease In"
        on:click={() => (animation.easing = "ease-in")}
        ><div class="button--contents"><EaseInSvg /></div></button
      >
      <button
        class="ease-button"
        data-tooltip="Ease Out"
        aria-label="Ease Out"
        on:click={() => (animation.easing = "ease-out")}
        ><div class="button--contents"><EaseOutSvg /></div></button
      >
      <button
        class="ease-button"
        data-tooltip="Ease In Out"
        aria-label="Ease In Out"
        on:click={() => (animation.easing = "ease-in-out")}
        ><div class="button--contents"><EaseInOutSvg /></div></button
      >
    </div>
    <div class="vertical-spacer-1" />
    <div>
      <div class="keyframes-row">
        <h3>@Keyframes</h3>
      </div>
      {#each animation.keyframes as keyframe, i (keyframe[0])}
        <Keyframe
          keyframes={animation.keyframes}
          bind:keyframeArray={animation.keyframes[i]}
          initialKeyframe={animation.keyframes[i]}
          animationDuration={duration}
          idx={i}
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

  .close-button {
    background-color: transparent;
    border: 0;
    box-shadow: none;
    cursor: pointer;
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
    border: none;
    border: 1px solid transparent;
    cursor: pointer;
    font-size: 10px;
    font-weight: bold;
    color: #b0b0b0;

    transition: border 200ms;
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

  .top-label {
    margin-top: 0.7rem;
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
    margin-bottom: 1rem;
  }
  h3 {
    color: var(--label-color);
    margin: 0;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    font-size: 16px;
  }
  .animation-controls {
    margin-bottom: 0.7rem;
  }
  .animation-controls__content {
    padding: 0.8rem 0.5rem;
  }
  .animation-name {
    background-color: var(--primary);
    border-radius: 4px;
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
    margin: 0.7rem 0;
  }

  .control-row {
    display: flex;
    align-items: center;
  }

  .control-row > label {
    flex: 1;
    font-size: 16px;
  }

  .button--contents {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:active {
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.13);
    background-color: #f2f2f2;
  }

  button:focus-visible {
    box-shadow: 0 0 0 2px blue;
  }

  button:active > .button--contents {
    transform: translateY(2px);
  }
</style>
