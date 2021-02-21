<script lang="ts">
  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      function () {
        /* clipboard successfully set */
      },
      function () {
        /* clipboard write failed */
      }
    );
  }
</script>

<h1>HELLO MODAL</h1>
<button on:click={() => updateClipboard("djasiodsajdiojas")}
  >djasiodsajdiojas</button
>
