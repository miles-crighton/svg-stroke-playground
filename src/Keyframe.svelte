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

  function getInitialActiveProperties(keyframeArray) {
    let activeProperties = {};
    // Keyframe is an array + has both a percent ([0]) and property array ([1])
    if (Array.isArray(keyframeArray) && keyframeArray.length >= 2) {
      // Check property array is an array
      if (Array.isArray(keyframeArray[1])) {
        console.log(keyframeArray[1]);
        // Find any properties and mark them as active
        keyframeArray[1].forEach((properties) => {
          if (Array.isArray(properties)) {
            activeProperties[convertSvgProperty(properties[0])] = true;
          }
        });
      }
    }
    return activeProperties;
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

  function convertSvgProperty(propertyName) {
    switch (propertyName) {
      case "stroke-dasharray":
        return "strokeDashArray";
      case "stroke-dashoffset":
        return "strokeDashOffset";
      case "stroke":
        return "strokeColor";
    }
    return propertyName;
  }

  function initializeValues() {
    strokeDashArray = $svgStrokeDashArray;
    strokeDashOffset = $svgStrokeOffset;
    strokeColor = $svgStrokeColor;
  }

  import ColorPicker from "./CoreUI/ColorPicker.svelte";
  import PercentInput from "./CoreUI/PercentInput.svelte";
  import RangeNumericInput from "./CoreUI/RangeNumericInput.svelte";
  import PropertiesMenu from "./PropertiesMenu.svelte";
  import ResetKeyframeSvg from "./svgs/buttons/resetKeyframe.svg";
  import PropertiesMenuSvg from "./svgs/buttons/propertiesMenu.svg";
  import {
    svgStrokeColor,
    svgStrokeDashArray,
    svgStrokeOffset,
  } from "./state/svgStore";
  import StrokeDashArray from "./StrokeDashArray.svelte";

  export let animationDuration = 1;
  let animationDurationScaled;

  export let initialKeyframe;
  console.log("INITIAL KEYFRAME", initialKeyframe);
  export let activeProperties = getInitialActiveProperties(initialKeyframe);
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

  let noActiveProperties = Object.values(activeProperties).reduce(
    (acc, val) => (val ? false : acc),
    true
  );

  $: noActiveProperties = Object.values(activeProperties).reduce(
    (acc, val) => (val ? false : acc),
    true
  );

  $: {
    console.log(activeProperties);
    console.log(noActiveProperties);
  }

  $: animationDurationScaled = animationDuration * (percent / 100);

  $: {
    let tempKeyframeArray = [`${percent}%`, []];
    if (strokeDashArray !== undefined && activeProperties.strokeDashArray)
      tempKeyframeArray[1].push(["stroke-dasharray", strokeDashArray]);
    if (strokeDashOffset !== undefined && activeProperties.strokeDashOffset)
      tempKeyframeArray[1].push(["stroke-dashoffset", strokeDashOffset]);
    if (strokeColor !== undefined && activeProperties.strokeColor)
      tempKeyframeArray[1].push(["stroke", strokeColor]);
    keyframeArray = tempKeyframeArray;
  }
</script>

<div>
  <div class="controls-row">
    <PercentInput bind:value={percent} />
    <div class="buttons-row">
      <button on:click={initializeValues}><ResetKeyframeSvg /></button>
      <PropertiesMenu bind:activeProperties />
    </div>
    <!-- <button on:click={lockValues}>Lock</button> -->
    <div class="duration-seconds">{animationDurationScaled}s</div>
  </div>
  <div class="keyframe">
    {#if activeProperties.strokeDashArray}
      <StrokeDashArray bind:stringValue={strokeDashArray} />
    {/if}
    {#if activeProperties.strokeDashOffset}
      {#if activeProperties.strokeDashArray}
        <div class="vertical-spacer-1" />
      {/if}
      <label>stroke-dashoffset</label>
      <RangeNumericInput bind:value={strokeDashOffset} />
    {/if}
    {#if activeProperties.strokeColor}
      {#if activeProperties.strokeDashArray || activeProperties.strokeDashOffset}
        <div class="vertical-spacer-1" />
      {/if}
      <ColorPicker bind:color={strokeColor} />
    {/if}
    {#if noActiveProperties}
      <div class="no-properties">
        <div>No active properties, use</div>
        <PropertiesMenuSvg fill="#b0b0b0" />
      </div>
    {/if}
  </div>
</div>

<style>
  button {
    border: 0;
    box-shadow: none;
    background-color: transparent;
  }

  .no-properties {
    font-size: 14px;
    font-weight: bold;
    color: #b0b0b0;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
  }

  .buttons-row {
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .vertical-spacer-1 {
    margin: 0.7rem 0;
    border-top: 1px dashed #dedede;
  }

  .no-properties > div {
    margin-right: 0.3rem;
  }

  button:active {
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.13);
    /* background-color: var(--button-bg-active); */
  }

  .keyframe {
    border-top: 0;
    border: 1px solid var(--controls-border);
    border-radius: 0 0 8px 8px;
    padding: 0.8rem 0.8rem;
    position: relative;
  }

  .controls-row {
    display: flex;
    border-radius: 8px 8px 0 0;
    position: relative;
    padding-right: 0.5rem;
    /* justify-content: space-between; */
    align-items: center;
    border: 1px solid var(--controls-border);
    border-bottom: 1px solid var(--controls-border);
    background-color: #e9e9e9;
    box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.05);
  }

  label {
    font-weight: bold;
    color: #6e1e49;
    margin-bottom: 0.3rem;
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
