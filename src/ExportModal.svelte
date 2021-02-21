<script lang="ts">
  import PrismJs from "./PrismJS.svelte";

  export let showCopied = null;
  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      function () {
        showCopied = "Successfully Copied";
        setTimeout(() => (showCopied = null), 1000);
        /* clipboard successfully set */
      },
      function () {
        showCopied = "Failed to Copy";
        setTimeout(() => (showCopied = null), 1000);
        /* clipboard write failed */
      }
    );
  }
</script>

<h1>HELLO MODAL</h1>

{#if showCopied}
  <div>{showCopied}</div>
{/if}
<PrismJs
  language="css"
  code={`
  .center-button {
    border-radius: 0;
  }

  .left-button {
    border-right: 0;
    border-radius: 6px 0 0 6px;
  }

  .right-button {
    border-left: 0;
    border-radius: 0 6px 6px 0;
  `}
/>
<button on:click={() => updateClipboard("djasiodsajdiojas")}
  >djasiodsajdiojas</button
>
