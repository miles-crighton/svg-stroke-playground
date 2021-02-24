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

function animationStore(initialValue) {
  const { subscribe, set, update } = writable(initialValue);

  return {
    subscribe,
    set: (value) => {
      console.log(value);
      return set(value);
    },
    update,
  };
}

export function addAnimation() {
  animations.update((state) => {
    console.log(state);
    state = [
      ...state,
      writable({ ...initialAnimation, name: `animation-${state.length + 1}` }),
    ];
    return state;
  });
}

export const animations = animationStore([writable({ ...initialAnimation })]);
