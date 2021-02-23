<script>
  function getInitialProperty(keyframeArray, propertyName) {
    if (Array.isArray(keyframeArray) && keyframeArray.length >= 2) {
      const idx = keyframeArray[1].findIndex((properties) => {
        if (Array.isArray(properties)) {
          return properties[0] === propertyName;
        }
        return getSvgProperty(propertyName);
      });
      if (idx > -1) {
        return keyframeArray[1][idx][1];
      }
    }
    return getSvgProperty(propertyName);
  }

  function getSvgProperty(propertyName) {
    switch (propertyName) {
      case "stroke-dasharray":
        return $svgStrokeDashArray;
      case "stroke-dashoffset":
        return $svgStrokeOffset;
      case "stroke":
        return $svgStrokeColor;
    }
    return null;
  }

  function initializeValues() {
    strokeDashArray = $svgStrokeDashArray;
    strokeDashOffset = $svgStrokeOffset;
    strokeColor = $svgStrokeColor;
  }

  import ColorPicker from "./CoreUI/ColorPicker.svelte";
  import PercentInput from "./CoreUI/PercentInput.svelte";
  import RangeNumericInput from "./CoreUI/RangeNumericInput.svelte";
  import {
    svgStrokeColor,
    svgStrokeDashArray,
    svgStrokeOffset,
  } from "./state/svgStore";
  import StrokeDashArray from "./StrokeDashArray.svelte";

  export let animationDuration = 1;
  let animationDurationScaled;

  export let initialKeyframe;
  export let activeProperties = null;
  export let strokeDashArray = getInitialProperty(
    initialKeyframe,
    "stroke-dasharray"
  );
  export let strokeDashOffset = getInitialProperty(
    initialKeyframe,
    "stroke-dashoffset"
  );
  export let strokeColor = getInitialProperty(initialKeyframe, "stroke");

  export let percent = parseFloat(initialKeyframe[0]);

  export let keyframeArray = initialKeyframe;

  $: animationDurationScaled = animationDuration * (percent / 100);

  // @BUG: Currently still saves values even if they're not being shown/active
  $: {
    let tempKeyframeArray = [`${percent}%`, []];
    if (strokeDashArray && activeProperties.strokeDashArray)
      tempKeyframeArray[1].push(["stroke-dasharray", strokeDashArray]);
    if (strokeDashOffset && activeProperties.strokeDashOffset)
      tempKeyframeArray[1].push(["stroke-dashoffset", strokeDashOffset]);
    if (strokeColor && activeProperties.strokeColor)
      tempKeyframeArray[1].push(["stroke", strokeColor]);
    keyframeArray = tempKeyframeArray;
  }
</script>

<div class="keyframe">
  <div class="duration-row">
    <PercentInput bind:value={percent} />
    <button on:click={initializeValues}>R</button>
    <!-- <button on:click={lockValues}>Lock</button> -->
    <div class="duration-seconds">{animationDurationScaled}s</div>
  </div>

  {#if activeProperties.strokeDashArray}
    <StrokeDashArray bind:stringValue={strokeDashArray} />
  {/if}
  {#if activeProperties.strokeDashOffset}
    <label>stroke-dashoffset</label>
    <RangeNumericInput bind:value={strokeDashOffset} />
  {/if}
  {#if activeProperties.strokeColor}
    <ColorPicker bind:color={strokeColor} />
  {/if}
</div>

<style>
  .keyframe {
    border-top: 1px dashed var(--controls-border);
    padding: 0.5rem 0.3rem;
  }

  .duration-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  label {
    font-weight: bold;
    color: #6e1e49;
    margin-bottom: 0.2rem;
  }

  .duration-seconds {
    background-color: #eaeaea;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    color: #b2b2b2;
    font-size: 12px;
    padding: 0.3rem;
    height: 14px;
  }
</style>
