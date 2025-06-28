import { atom } from "jotai";
import type { Context, ConfigParam } from "package-types";

export const counterAtom = atom<Context>({
  step: 1,
  count: 0,
  max: 10,
  delay: 3,
  isDelayed: false,
  isLoading: false,
});

export const resetContextAtom = atom(null, (get, set) => {
  const context = get(counterAtom);

  if (context.isLoading) return;

  set(counterAtom, {
    ...context,
    step: 1,
    count: 0,
    max: 10,
    delay: 3,
    isDelayed: false,
    isLoading: false,
  });
});

export const updateConfigAtom = atom(null, (get, set, param: ConfigParam) => {
  const context = get(counterAtom);

  if (context.isLoading) return;

  set(counterAtom, {
    ...context,
    max: param.max,
    delay: param.delay,
    isDelayed: param.isDelayed,
  });
});

export const updateStepAtom = atom(null, (get, set, action: "INC" | "DEC") => {
  const context = get(counterAtom);

  if (context.isLoading) return;

  if (action === "INC") {
    set(counterAtom, { ...context, step: context.step + 1 });
  }

  if (action === "DEC" && context.step - 1 >= 1) {
    set(counterAtom, { ...context, step: context.step - 1 });
  }
});

export const updateCountAtom = atom(null, (get, set, action: "INC" | "DEC") => {
  const context = get(counterAtom);

  if (context.isLoading) return;

  if (action === "INC" && context.count + context.step <= context.max) {
    set(counterAtom, { ...context, count: context.count + context.step });
  }

  if (action === "DEC" && context.count - context.step >= 0) {
    set(counterAtom, { ...context, count: context.count - context.step });
  }
});

export const updateDelayCountAtom = atom(
  null,
  (get, set, action: "INC" | "DEC") => {
    const context = get(counterAtom);

    if (context.isLoading) return;

    if (action === "INC" && context.count + context.step <= context.max) {
      set(counterAtom, { ...context, isLoading: true });

      setTimeout(() => {
        set(counterAtom, (context) => ({
          ...context,
          count: context.count + context.step,
          isLoading: false,
        }));
      }, context.delay * 1000);
    }

    if (action === "DEC" && context.count - context.step >= 0) {
      set(counterAtom, { ...context, isLoading: true });

      setTimeout(() => {
        set(counterAtom, (context) => ({
          ...context,
          count: context.count - context.step,
          isLoading: false,
        }));
      }, context.delay * 1000);
    }
  },
);
