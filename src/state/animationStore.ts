import type { init } from "svelte/internal";
import { get, writable } from "svelte/store";
import {
  replaceStylesheetAnimation,
  replaceStylesheetKeyframes,
} from "../utils/addStylesheetRules";

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

// Initialize animation styles in head
const animationsRaw = get(animations);
replaceStylesheetAnimation(
  animationsRaw.reduce((acc, store) => [...acc, get(store)], [])
);
animationsRaw.forEach((store, i) => {
  const animation: Animation = get(store);
  replaceStylesheetKeyframes(animation.name, animation.keyframes, i);
});
