<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import SliderThumbScrubSvg from "../svgs/sliderThumbScrub.svg";

  const dispatch = createEventDispatcher();
  export let min = 0;
  export let max = 100;
  export let initialValue: number | string = 0;
  export let value: number =
    typeof initialValue === "string" ? parseInt(initialValue) : initialValue;

  let elementX = null;
  let element: Element = null;
  let pointer = null;
  let containerWidth = null;
  let progressBarNode = null;
  let currentPointer = null;
  let holding = false;
  let keydownAcceleration = 0;
  let accelerationTimer = null;

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

  // Mouse shield used onMouseDown to prevent any mouse events penetrating other elements,
  // ie. hover events on other elements while dragging
  const mouseEventShield = document.createElement("div");
  mouseEventShield.setAttribute("class", "mouseOverShield");
  mouseEventShield.addEventListener("mouseover", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  function onTouchStart() {
    currentPointer = pointer;
  }

  function onKeyPress(e: KeyboardEvent) {
    // Max out at +/- 20 to value per event (100 events / 5)
    // 100 below is to increase the amount of events required to reach max velocity
    if (keydownAcceleration < 100) keydownAcceleration++;
    let throttled = Math.ceil(keydownAcceleration / 5);

    console.log(value, keydownAcceleration, throttled);

    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      if (value + throttled > max || value >= max) {
        setValue(max);
      } else {
        setValue(value + throttled);
      }
    }
    if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      if (value - throttled < min || value <= min) {
        setValue(min);
      } else {
        setValue(value - throttled);
      }
    }

    // Reset acceleration after 100ms of no events
    clearTimeout(accelerationTimer);
    accelerationTimer = setTimeout(() => (keydownAcceleration = 1), 100);
  }

  function onDrag(e: MouseEvent | TouchEvent) {
    if (!currentPointer) return false;

    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();

    const clientX =
      e.type === "touchmove"
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;

    // Center of thumb: 20px / 2 = 10px
    let delta = clientX - (elementX + 10);

    // Use width of the container minus center of thumb for percent calc
    let percent = (delta * 100) / (container.clientWidth - 10);

    // Limit percent 0 -> 100
    percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

    // Limit value min -> max
    setValue(parseInt((percent * (max - min)) / 100) + min);
  }

  // Set a class based on if dragging
  $: holding = Boolean(currentPointer);

  // Update styles to represent value
  $: if (progressBar && pointer) {
    // Limit value to min/max
    value = value > min ? value : min;
    value = value < max ? value : max;

    let percent = ((value - min) * 100) / (max - min);
    let offsetLeft = (container.clientWidth - 10) * (percent / 100);

    pointer.style.left = `${offsetLeft}px`;
    progressBarNode.style.width = `${offsetLeft}px`;
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
  <div
    class="slider__wrapper"
    tabindex="0"
    use:elmPosition
    on:keydown={onKeyPress}
  >
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
    outline: none;
  }

  .slider__wrapper:focus > .slider__track {
    box-shadow: 0 0 0 1px rgba(147, 81, 255, 0.5),
      0 0 0 3px rgba(147, 81, 255, 0.4);
  }

  .slider__track {
    height: 0.5rem;
    background-color: #d0d0d0;
    border-radius: 999px;
  }
  .slider__track--highlighted {
    background-color: #ff8c8c;
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
