import type { init } from "svelte/internal";
import { writable } from "svelte/store";

const initialAnimation = {
  name: "Animation 1",
  infinite: true,
  duration: 1,
  delay: 0,
  easing: "linear",
  keyframes: [
    ["0%", ["stroke-dashoffset", "200"]],
    ["100%", ["stroke-dashoffset", "0"]],
  ],
};

export type Animation = typeof initialAnimation;

function animationStore() {
  const { subscribe, set, update } = writable([
    {
      name: "Animation 1",
      infinite: true,
      duration: 1,
      delay: 0,
      easing: "linear",
      keyframes: [
        ["0%", ["stroke-dashoffset", "200"]],
        ["100%", ["stroke-dashoffset", "0"]],
      ],
    },
  ]);

  return {
    subscribe,
    set: (value) => {
      // console.log(value);
      return set(value);
    },
    update,
  };
}

export const animations = animationStore();
