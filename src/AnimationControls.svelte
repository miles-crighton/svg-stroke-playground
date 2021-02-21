<script lang="ts">
  import Keyframe from "./Keyframe.svelte";
  import NumericInput from "./CoreUI/NumericInput.svelte";
  import EaseInSvg from "./svgs/buttons/easeIn.svg";
  import EaseOutSvg from "./svgs/buttons/easeOut.svg";
  import EaseInOutSvg from "./svgs/buttons/easeInOut.svg";
  import LinearSvg from "./svgs/buttons/linear.svg";
  import DownArrowSvg from "./svgs/numericArrowDown.svg";
  import {
    replaceStylesheetAnimation,
    replaceStylesheetKeyframes,
  } from "./utils/addStylesheetRules";
  import Toggle from "./CoreUI/Toggle.svelte";
  import type { Animation } from "./state/animationStore";

  export let animation: Animation;
  let activeProperties = {
    strokeDashOffset: true,
    strokeDashArray: false,
    strokeColor: false,
  };
  let propertiesOpen = false;

  export let styleEl = document.createElement("style");

  document.head.appendChild(styleEl);

  $: ({ keyframes, delay, duration, infinite, easing, name } = animation);

  $: replaceStylesheetKeyframes(name, keyframes, styleEl);

  // $: {
  //   document.documentElement.style.setProperty(
  //     "--animation-delay",
  //     `${delay}s`
  //   );
  // }
  // $: {
  //   document.documentElement.style.setProperty(
  //     "--animation-duration",
  //     `${duration}s`
  //   );
  // }
  // $: {
  //   document.documentElement.style.setProperty(
  //     "--animation-infinite",
  //     `${infinite ? "infinite" : 1}`
  //   );
  // }
  // $: {
  //   document.documentElement.style.setProperty(
  //     "--animation-easing",
  //     `${easing}`
  //   );
  // }

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
  <div class="animation-name">{animation.name}</div>
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
    <label>Easing</label>
    <div class="easing-buttons">
      <button class="ease-button" on:click={() => (animation.easing = "linear")}
        ><LinearSvg /></button
      >
      <button
        class="ease-button"
        on:click={() => (animation.easing = "ease-in")}><EaseInSvg /></button
      >
      <button
        class="ease-button"
        on:click={() => (animation.easing = "ease-out")}><EaseOutSvg /></button
      >
      <button
        class="ease-button"
        on:click={() => (animation.easing = "ease-in-out")}
        ><EaseInOutSvg /></button
      >
    </div>
    <div>
      <div class="keyframes-row">
        <h3>@Keyframes</h3>
        <div class="properties-wrapper">
          <button
            class="properties-button"
            on:click={() => (propertiesOpen = !propertiesOpen)}
            ><span>Properties</span><DownArrowSvg /></button
          >
          {#if propertiesOpen}
            <div class="properties-menu">
              <div>
                <input
                  type="checkbox"
                  id="horns"
                  name="horns"
                  checked={activeProperties.strokeDashArray}
                  on:change={(e) =>
                    (activeProperties.strokeDashArray =
                      e.currentTarget.checked)}
                />
                <label for="horns">stroke-dasharray</label>
                <input
                  type="checkbox"
                  id="horns"
                  name="horns"
                  checked={activeProperties.strokeDashOffset}
                  on:change={(e) =>
                    (activeProperties.strokeDashOffset =
                      e.currentTarget.checked)}
                />
                <label for="horns">Stroke-dashoffset</label>
                <input
                  type="checkbox"
                  id="horns"
                  name="horns"
                  checked={activeProperties.strokeColor}
                  on:change={(e) =>
                    (activeProperties.strokeColor = e.currentTarget.checked)}
                />
                <label for="horns">stroke-color</label>
              </div>
            </div>
          {/if}
        </div>
      </div>
      {#each animation.keyframes as keyframe, i (keyframe[0])}
        <Keyframe
          bind:keyframeArray={animation.keyframes[i]}
          {activeProperties}
          initialKeyframe={animation.keyframes[i]}
          animationDuration={duration}
        />
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

  .keyframes-row > h3 {
    flex: 1;
  }

  .properties-wrapper {
    position: relative;
  }

  .properties-menu {
    position: absolute;
    right: 0;
    margin-top: 0.5rem;
    width: 100px;
    background: white;
    z-index: 2;
  }

  .properties-button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    cursor: pointer;
  }

  .properties-button > span {
    margin-right: 0.3rem;
  }

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
