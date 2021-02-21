<svelte:head>
  <style>
    :root {
      --animation-duration: 1s;
      --animation-delay: 0s;
      --animation-state: running;

      --label-color: #6e1e49;
      --controls-bg: #f3f3f3;
      --controls-border: #d1d1d1;

      --button-bg: #ffffff;
      --button-border: #d1d1d1;
      --button-bg-active: #f2f2f2;
      --button-inset-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.13);

      --input-text: #464646;

      --primary: #fb6c96;
    }
    /*This would all go into the global.css file*/
    [data-tooltip] {
      position: relative;
      z-index: 2;
      display: block;
    }

    [data-tooltip]:before,
    [data-tooltip]:after {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      transition: 0.2s ease-out;
      transform: translate(-50%, 5px);
    }

    [data-tooltip]:before {
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-bottom: 5px;
      padding: 7px 20px 7px 12px;
      width: 100%;
      min-width: 70px;
      max-width: 250px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      background-color: #000;
      background: linear-gradient(45deg, #7d1d43, #5c1646);
      color: #fff;
      content: attr(data-tooltip);
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      line-height: 1.2;
      transition: 0.2s ease-out;
      white-space: pre;
    }

    [data-tooltip]:after {
      position: absolute;
      bottom: 100%;
      left: 50%;
      width: 0;
      border-top: 5px solid #000;
      border-top: 5px solid #7d1d43;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      content: " ";
      font-size: 0;
      line-height: 0;
    }

    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
      visibility: visible;
      opacity: 1;
      transform: translate(-50%, 0);
    }
    [data-tooltip="false"]:hover:before,
    [data-tooltip="false"]:hover:after {
      visibility: hidden;
      opacity: 0;
    }

    button {
      margin: 0;
      background-color: var(--button-bg);
      border: 1px solid var(--button-border);
      box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.13);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button:active {
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.13);
      background-color: var(--button-bg-active);
    }

    /* .svgElement {
      animation: animation-1 var(--animation-duration) var(--animation-delay)
        var(--animation-state) var(--animation-easing) infinite;
    } */

    .github-corner {
      position: absolute;
      left: 0;
      top: 0;
    }

    .github-corner:hover #octocat-arm {
      animation: octocat-wave 0.9s;
      transform-origin: center;
    }

    @keyframes octocat-wave {
      0% {
        transform: rotate(0deg);
      }
      30% {
        transform: rotate(-10deg);
      }
      60% {
        transform: rotate(5deg);
      }
      80% {
        transform: rotate(-6deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  </style>
</svelte:head>
