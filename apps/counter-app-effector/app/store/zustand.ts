import { create } from "zustand";
import type { Context, ConfigParam } from "package-types";

type Actions = {
  reset: () => void;
  config: (param: ConfigParam) => void;
  step: (action: "INC" | "DEC") => void;
  count: (action: "INC" | "DEC") => void;
  delayedCount: (action: "INC" | "DEC") => void;
};

type CounterStore = {
  context: Context;
  actions: Actions;
};

const useCounterStore = create<CounterStore>((set, get) => ({
  context: {
    step: 1,
    count: 0,
    max: 10,
    delay: 3,
    isDelayed: false,
    isLoading: false,
  },
  actions: {
    reset: () => {
      const store = get();

      if (!store.context.isLoading) {
        set({
          context: {
            ...store.context,
            step: 1,
            count: 0,
            max: 10,
            delay: 3,
            isDelayed: false,
            isLoading: false,
          },
        });
      }
    },
    config: (param) => {
      const store = get();

      if (!store.context.isLoading) {
        set({
          context: {
            ...store.context,
            max: param.max,
            delay: param.delay,
            isDelayed: param.isDelayed,
          },
        });
      }
    },
    step: (action) => {
      const store = get();

      if (store.context.isLoading) return;

      if (action === "INC") {
        set({ context: { ...store.context, step: store.context.step + 1 } });
      }

      if (action === "DEC" && store.context.step - 1 >= 1) {
        set({ context: { ...store.context, step: store.context.step - 1 } });
      }
    },
    count: (action) => {
      const store = get();

      if (store.context.isLoading) return;

      if (
        action === "INC" &&
        store.context.count + store.context.step <= store.context.max
      ) {
        set({
          context: {
            ...store.context,
            count: store.context.count + store.context.step,
          },
        });
      }

      if (action === "DEC" && store.context.count - store.context.step >= 0) {
        set({
          context: {
            ...store.context,
            count: store.context.count - store.context.step,
          },
        });
      }
    },
    delayedCount: (action) => {
      const store = get();

      if (store.context.isLoading) return;

      if (
        action === "INC" &&
        store.context.count + store.context.step <= store.context.max
      ) {
        set({ context: { ...store.context, isLoading: true } });

        setTimeout(() => {
          set((store) => ({
            context: {
              ...store.context,
              count: store.context.count + store.context.step,
              isLoading: false,
            },
          }));
        }, store.context.delay * 1000);
      }

      if (action === "DEC" && store.context.count - store.context.step >= 0) {
        set({ context: { ...store.context, isLoading: true } });

        setTimeout(() => {
          set((store) => ({
            context: {
              ...store.context,
              count: store.context.count - store.context.step,
              isLoading: false,
            },
          }));
        }, store.context.delay * 1000);
      }
    },
  },
}));

export const useCounter = () => useCounterStore((store) => store.context);
export const useCounterActions = () =>
  useCounterStore((store) => store.actions);
