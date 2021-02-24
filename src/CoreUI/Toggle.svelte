<script lang="ts">
  import ThumbScrub from "../svgs/sliderThumbScrub.svg";
  export let initialValue = false;
  export let toggled = initialValue;

  export let label = "Toggle";
</script>

<div class="toggle-wrapper">
  <span>{label}</span>
  <div class="toggle">
    <button
      on:click={() => (toggled = !toggled)}
      class="toggle__track"
      class:toggle__track--toggled={toggled}
    >
      <div class="toggle__thumb" class:toggle__thumb--toggled={toggled}>
        <ThumbScrub />
      </div>
    </button>
  </div>
</div>

<style>
  .toggle-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .toggle-wrapper > span {
    font-weight: 600;
    color: #6e1e49;
    flex: 2;
    margin: 0.4rem 0;
  }

  .toggle {
    width: 50px;
    height: 20px;
    position: relative;
  }
  .toggle__track {
    height: 100%;
    width: 100%;
    padding: 0.5rem 0;
    border-radius: 999px;
    background: #d0d0d0;
    border: 0;
    justify-content: flex-start;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    transition: background 200ms;
  }

  .toggle__track--toggled {
    background-color: #ff8c8c;
    background: linear-gradient(45deg, #fc8080, #fa6eeb);
  }
  .toggle__thumb {
    border-radius: 999px;
    background-color: var(--button-bg);
    border: 1px solid var(--button-border);
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07),
      inset 0 -1px 3px rgba(0, 0, 0, 0.12);

    transition: transform 200ms;
  }

  .toggle__thumb--toggled {
    transform: translateX(100%);
  }
</style>
