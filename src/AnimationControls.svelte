<script lang="ts">
  import { replaceStylesheetAnimation } from "./utils/addStylesheetRules";

  let animation = [
    ["0%", ["stroke-dashoffset", "200"]],
    ["100%", ["stroke-dashoffset", "0"]],
  ];

  let styleEl = document.createElement("style");

  document.head.appendChild(styleEl);

  replaceStylesheetAnimation(animation, styleEl);
</script>

<div>
  stroke-dashoffset
  <div>0% <input /></div>
  <div>0% <input /></div>
</div>
