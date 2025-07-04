import { createAtom, createStore } from "@xstate/store";
import type { ConfigParam, Context, Operation } from "package-types";

const initialContext: Context = {
  step: 1,
  count: 0,
  max: 10,
  delay: 3,
  isDelayed: false,
  isLoading: false,
};

const loadingAtom = createAtom(false);

const counter = createStore({
  context: initialContext,
  emits: {
    loading: (payload: { value: boolean }) => {
      loadingAtom.set(payload.value);
    },
  },
  on: {
    reset: (context) => ({
      ...context,
      ...initialContext,
    }),
    config: (context, event: { value: ConfigParam }) => ({
      ...context,
      ...event.value,
    }),
    step: (context, event: { value: Operation }) => {
      if (context.isLoading) return context;

      switch (event.value) {
        case "INC":
          return { ...context, step: context.step + 1 };
        case "DEC":
          return context.step - 1 >= 1
            ? { ...context, step: context.step - 1 }
            : context;
        default:
          return context;
      }
    },
    count: (context, event: { value: Operation }, enqueue) => {
      if (context.isLoading) return context;

      switch (event.value) {
        case "INC":
          enqueue.emit.loading({ value: false });
          return context.count + context.step <= context.max
            ? {
                ...context,
                count: context.count + context.step,
              }
            : context;
        case "DEC":
          enqueue.emit.loading({ value: false });
          return context.count - context.step >= 0
            ? {
                ...context,
                count: context.count - context.step,
              }
            : context;
        default:
          return { ...context };
      }
    },
    delay: (context, event: { value: Operation }, enqueue) => {
      if (context.isLoading) return context;

      switch (event.value) {
        case "INC":
          if (!(context.count + context.step <= context.max)) break;

          enqueue.emit.loading({ value: true });

          enqueue.effect(async () => {
            await new Promise((resolve) =>
              setTimeout(resolve, context.delay * 1000),
            );
            counter.send({ type: "count", value: "INC" });
          });

          break;

        case "DEC":
          if (!(context.count - context.step >= 0)) break;

          enqueue.emit.loading({ value: true });

          enqueue.effect(async () => {
            await new Promise((resolve) =>
              setTimeout(resolve, context.delay * 1000),
            );

            counter.send({ type: "count", value: "DEC" });
          });

          break;
      }

      return context;
    },
  },
});

export { counter, loadingAtom };
