<script>
  import ColorPicker from "./CoreUI/ColorPicker.svelte";
  import PercentInput from "./CoreUI/PercentInput.svelte";
  import RangeNumericInput from "./CoreUI/RangeNumericInput.svelte";
  import StrokeDashArray from "./StrokeDashArray.svelte";

  // Very messy at the moment with initialization etc.
  export let animationDuration = 1;
  let animationDurationScaled;
  export let activeProperties = null;
  export let strokeDashArray = null;
  export let strokeDashOffset = null;
  export let initialKeyframe = [`${0}%`, ["strokeDashArray", strokeDashArray]];
  export let percent = parseFloat(initialKeyframe[0]);

  export let keyframeArray = initialKeyframe;

  $: animationDurationScaled = animationDuration * (percent / 100);

  $: keyframeArray = [
    `${percent}%`,
    [
      ["stroke-dasharray", strokeDashArray],
      ["stroke-dashoffset", strokeDashOffset],
    ],
  ];
</script>

<div class="keyframe">
  <div class="duration-row">
    <PercentInput bind:value={percent} />
    <div class="duration-seconds">{animationDurationScaled}s</div>
  </div>

  {#if activeProperties.strokeDashArray}
    <StrokeDashArray bind:stringValue={strokeDashArray} />
  {/if}
  {#if activeProperties.strokeDashOffset}
    <label>stroke-dashoffset</label>
    <RangeNumericInput bind:value={strokeDashOffset} />
  {/if}
  {#if activeProperties.color}
    <ColorPicker />
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
