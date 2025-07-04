import { createStore, createEvent, createEffect, sample } from "effector";
import type { ConfigParam, Context, Operation } from "package-types";
import { debug } from "patronum";

export const $counter = createStore<Context>({
  step: 1,
  count: 0,
  max: 10,
  delay: 3,
  isDelayed: false,
  isLoading: false,
});

export const counterReset = createEvent();
export const counterConfig = createEvent<ConfigParam>();
export const counterStep = createEvent<Operation>();
export const counterCount = createEvent<Operation>();
export const counterCountDelay = createEvent<Operation>();

const delayedCountFx = createEffect<
  { operation: Operation; delay: number },
  Operation
>(async ({ operation, delay }) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(operation);
    }, delay * 1000),
  );
});

$counter
  .on(counterConfig, (state, config) => ({ ...state, ...config }))
  .on(counterStep, (state, operation) => {
    if (state.isLoading) return state;

    switch (operation) {
      case "INC":
        return { ...state, step: state.step + 1 };
      case "DEC":
        return state.step - 1 >= 1 ? { ...state, step: state.step - 1 } : state;

      default:
        return state;
    }
  })
  .on(delayedCountFx.pending, (state) => ({ ...state, isLoading: true }))
  .on([counterCount, delayedCountFx.doneData], (state, operation) => {
    if (state.isLoading) return state;

    switch (operation) {
      case "INC":
        return state.count + state.step <= state.max
          ? { ...state, count: state.count + state.step }
          : state;
      case "DEC":
        return state.count - state.step >= 0
          ? { ...state, count: state.count - state.step }
          : state;
      default:
        return { ...state };
    }
  })
  .on(delayedCountFx.finally, (state) => ({ ...state, isLoading: false }))
  .reset(counterReset);

sample({
  clock: counterCountDelay,
  source: $counter,
  filter: (counter, operation) => {
    if (counter.isLoading) return false;
    switch (operation) {
      case "INC":
        return counter.count + counter.step <= counter.max;
      case "DEC":
        return counter.count - counter.step >= 0;
      default:
        return false;
    }
  },
  fn: (counter, operation) => ({ operation, delay: counter.delay }),
  target: delayedCountFx,
});

debug($counter);
