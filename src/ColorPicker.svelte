<script lang="ts">
  export let color = "#ff0000";
</script>

<div class="color-picker">
  <label>Stroke Color</label>
  <input type="color" bind:value={color} />
</div>

<style>
  .color-picker {
    display: flex;
  }

  label {
    font-weight: 600;
    color: #6e1e49;
    flex: 1;
  }
</style>
