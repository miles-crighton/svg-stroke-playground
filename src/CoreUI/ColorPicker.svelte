<script lang="ts">
  export let color = "#ff0000";
</script>

<div class="color-picker">
  <span>Stroke Color</span>

  <div class="label-wrapper">
    <label style={`background-color: ${color};`}>
      <input type="color" bind:value={color} />
    </label>
  </div>
</div>

<style>
  .color-picker {
    display: flex;
    align-items: center;
  }

  label {
    background-color: black;
    height: 24px;
    width: 40px;
    border-radius: 4px;
  }

  .label-wrapper {
    padding: 0.3rem;
    border: 1px solid var(--controls-border);
    border-radius: 8px;
    background-color: white;
  }

  .label-wrapper:focus-within {
    box-shadow: 0 0 0 2px blue;
  }

  input {
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  span {
    font-weight: 600;
    color: #6e1e49;
    flex: 1;
  }
</style>
