import type { init } from "svelte/internal";
import { writable } from "svelte/store";

const initialAnimation = {
  name: "animation-1",
  infinite: true,
  duration: 1,
  delay: 0,
  easing: "linear",
  keyframes: [
    ["0%", [["stroke-dashoffset", 50]]],
    ["100%", [["stroke-dashoffset", 0]]],
  ] as Keyframes,
};

export type Keyframes = Array<[string, Array<[string, number | string]>]>;

export type Animation = typeof initialAnimation;

function animationStore() {
  const { subscribe, set, update } = writable([initialAnimation]);

  return {
    subscribe,
    set: (value) => {
      return set(value);
    },
    update,
  };
}

export const animations = animationStore();
