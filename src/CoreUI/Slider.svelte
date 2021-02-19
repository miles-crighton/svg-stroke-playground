<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import SliderThumbScrubSvg from "../svgs/sliderThumbScrub.svg";

  const dispatch = createEventDispatcher();
  export let min = 0;
  export let max = 100;
  export let initialValue = 0;
  export let value = initialValue;

  let elementX = null;
  let element: Element = null;
  let pointer = null;
  let containerWidth = null;
  let progressBarNode = null;
  let currentPointer = null;
  let holding = false;

  function elmPosition(node) {
    const rect = node.getBoundingClientRect();
    elementX = rect.left;
    element = node;
  }

  let container;
  function setContainer(node) {
    const rect = node.getBoundingClientRect();
    // console.log(rect, node.clientWidth);
    container = node;
    containerWidth = node.clientWidth;
  }

  function setPointer(node) {
    console.log(node);
    pointer = node;
  }

  function progressBar(node) {
    progressBarNode = node;
  }

  function mouseUp() {
    document.body.removeChild(mouseEventShield);
    currentPointer = null;
  }

  function touchCancel() {
    currentPointer = null;
  }

  function resizeWindow() {
    containerWidth = container.clientWidth;
    elementX = element.getBoundingClientRect().left;
  }

  function setValue(val) {
    value = val;
    dispatch("change", value);
  }

  function onMouseDown() {
    currentPointer = pointer;
    document.body.append(mouseEventShield);
  }

  $: holding = Boolean(currentPointer);

  function checkSelect() {
    return false;
  }

  const mouseEventShield = document.createElement("div");
  mouseEventShield.setAttribute("class", "mouseOverShield");
  mouseEventShield.addEventListener("mouseover", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  function onTouchStart() {
    currentPointer = pointer;
  }

  function onDrag(e: MouseEvent | TouchEvent) {
    if (!currentPointer) return false;

    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();

    // console.log("WIDTH", containerWidth);

    const clientX =
      e.type === "touchmove"
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;

    let delta = clientX - (elementX + 10); // Center of thumb: 20px / 2 = 10px

    let percent = (delta * 100) / (container.clientWidth - 10);
    // console.log(delta, percent, containerWidth, container.clientWidth);
    percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
    setValue(parseInt((percent * (max - min)) / 100) + min);
  }

  $: if (progressBar && pointer) {
    value = value > min ? value : min;
    value = value < max ? value : max;
    let per = ((value - min) * 100) / (max - min);
    let left = (container.clientWidth - 10) * (per / 100);

    left = `${left}px`;
    pointer.style.left = left;
    progressBarNode.style.width = left;
  }
</script>

<svelte:window
  on:touchmove|nonpassive={onDrag}
  on:touchcancel={touchCancel}
  on:touchend={touchCancel}
  on:mousemove={onDrag}
  on:mouseup={mouseUp}
  on:resize={resizeWindow}
/>
<div class="slider">
  <div class="slider__wrapper" use:elmPosition>
    <div class="slider__track" use:setContainer>
      <div class="slider__track--highlighted" use:progressBar />
      <div
        class="slider__thumb"
        class:slider__thumb--holding={holding}
        unselectable={true}
        onselectstart={() => false}
        use:setPointer
        on:touchstart={onTouchStart}
        on:mousedown={onMouseDown}
      >
        <SliderThumbScrubSvg />
      </div>
    </div>
  </div>
</div>

<svelte:head>
  <style>
    .mouseOverShield {
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      background-color: rgba(255, 0, 0, 0); /* just for demo. make it 0.0 */
      z-index: 10000;
    }
  </style>
</svelte:head>

<style>
  .slider {
    position: relative;
    flex: 1;
    /* width: 100px; */
  }

  .slider__wrapper {
    min-width: 100%;
    position: relative;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  .slider__track {
    height: 0.5rem;
    background-color: #d0d0d0;
    border-radius: 999px;
  }
  .slider__track--highlighted {
    background: linear-gradient(45deg, #ff8c8c, #fa6eeb);
    width: 0;
    height: 0.5rem;
    position: absolute;
    border-radius: 999px;
  }

  .slider__thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #d3d3d3;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07),
      inset 0 -1px 3px rgba(0, 0, 0, 0.12);
    border-radius: 999px;
    margin-top: -0.5rem;
    transition: box-shadow 100ms;
    user-select: none;
  }

  .slider__thumb--holding {
    box-shadow: 0 0 0 5px rgba(254, 134, 205, 0.3);
  }
</style>
