import { createActorContext } from "@xstate/react";
import { and, assertEvent, assign, not, setup } from "xstate";

type MutationType = "INCREMENT" | "DECREMENT";

export const appMachine = setup({
  types: {
    context: {} as {
      count: number;
      step: number;
      max: number;
      pendingMutation: "NONE" | "INC" | "DEC";
    },
    events: {} as
      | { type: "TOGGLE_APP_MODE" }
      | { type: "TOGGLE_COUNTER_MODE" }
      | { type: "SET_MAX"; value: number }
      | { type: "SET_STEP"; value: MutationType }
      | { type: "SET_COUNT"; value: MutationType }
      | { type: "RESET_CONTEXT" },
  },
  actions: {
    setMax: assign(({ event }) => {
      assertEvent(event, "SET_MAX");
      return { max: event.value };
    }),
    setStep: assign(({ context, event }) => {
      assertEvent(event, "SET_STEP");
      switch (event.value) {
        case "INCREMENT":
          return { step: context.step + 1 };

        case "DECREMENT":
          return { step: context.step - 1 };

        default:
          return { step: context.step };
      }
    }),
    setCountSync: assign(({ context, event }) => {
      assertEvent(event, "SET_COUNT");
      switch (event.value) {
        case "INCREMENT":
          return { count: context.count + context.step };

        case "DECREMENT":
          return { count: context.count - context.step };

        default:
          return { count: context.count };
      }
    }),
    setCountAsync: assign(({ context }) => {
      switch (context.pendingMutation) {
        case "INC":
          return {
            count: context.count + context.step,
            pendingMutation: "NONE" as const,
          };

        case "DEC":
          return {
            count: context.count - context.step,
            pendingMutation: "NONE" as const,
          };

        default:
          return {
            count: context.count,
            pendingMutation: "NONE" as const,
          };
      }
    }),
    setPendingMutation: assign(({ event }) => {
      assertEvent(event, "SET_COUNT");

      switch (event.value) {
        case "INCREMENT":
          return { pendingMutation: "INC" as const };

        case "DECREMENT":
          return { pendingMutation: "DEC" as const };

        default:
          return { pendingMutation: "NONE" as const };
      }
    }),
    resetContext: assign({
      count: 0,
      step: 1,
      max: 10,
    }),
  },
  guards: {
    isValidStep: ({ context, event }) => {
      assertEvent(event, "SET_STEP");
      switch (event.value) {
        case "INCREMENT":
          return context.step + 1 < 100;

        case "DECREMENT":
          return context.step - 1 > 0;

        default:
          return false;
      }
    },
    isValidCount: ({ context, event }) => {
      assertEvent(event, "SET_COUNT");
      switch (event.value) {
        case "INCREMENT":
          return context.count + context.step <= context.max;

        case "DECREMENT":
          return context.count - context.step >= 0;

        default:
          return false;
      }
    },
    isMutationPending: ({ context }) => {
      return context.pendingMutation !== "NONE";
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqCyyDGALAlgHZgB0aqAgtgC74BuYAxACoDyA4uwDICiA+hQAKgvhlYARHgG0ADAF1EoVAHtY+WssKKQAD0QAOACwySAVgDMARgBMpgDQgAnokMA2ayQCcM9+f2XTfXNra0MAXzCHciw8IlJyKloGRgBlHmZRCgANWQUkEBU1DS18vQRzT08SfU8jcwB2eydEa096kmsZK2sjS3rLAdMIqPQYgmIydET6JjSMlOYeQVztQvV8TW0yhtMSQwDO1v8+w1NXB2cEIxJXfVNLV1NDWtv9VuGQaJxx+KmaGcYACUeHM+ABhVgAOUWWWYK3ya2KW0Qfl2rnqrksnmsrmClXcF0Q9R6e1MxMC-UMhnqnlcHy+sQmCX+DBIsEchGwLA43H4EIAqtCeIDRBJpPJVqp1ptSij9PoOjIAuZXIZQjIatZCQhfCRzKZPOZ9cZajV6aNvnFJpQWaR2ZzUulwaxBXCJQipUjZQhLDITL6ZGrOpZ5bZ9trgpYSI0Vfpbj0VV1wpFPhbGb8bUl4vauWxOLxna7haLJPClJ6NiVQNt-NHafpGtrTGSzDiZEdQrVPJZzZhLUy-lmyDmSAAnODKAA2DAgjoyAuhZYKFZl1cQMm1Ml7YytzKHyBHqDAhAgRCgjB0sGoyGo8QAZrfRwAKTp+gCUjAZP2t01ZB452AkEeJ5nkuiKVsiCAALQPB4FT6BqQZYvcarasS1RqoY5hqp4pg+NSQwpl+u7oAAkoQOBZty+b8EIIhiKW7rlkUEHeqYWrNFcUZ4X6SZ9AMAQRCmhDKBAcDaMRxCSixq66IgUHmD4eq1IhITIZYhjalBOIeDxSqVM2uHKtu-YZr+YDSdKVZydBtgKvBqnWOpmmcTBjQkLx7aKRi9SBrSJnpj+tpsgBllemuPqeIY1S1FhjacWc5g3DIhq4gEQQhMmIx9oFe4zMOoUejJ1llNpvrKQhRhqUZqGuQ2Ziea4jxYkERgBd+eV-iO46wFOM5haxEUbpxlIkAEvods8NQ9kRaYdYO+X-pyQHHqehBQANsllMNlxGAqzV+hUSrGBU7UkZm+UEFeyijpczFWZBWLRTUdTxZc7geL6qVWIEwShGdA6oORlEzJtJWIOi2q+piHnuHh2H8QMyYREAA */
  id: "appMachine",
  context: {
    count: 0,
    step: 1,
    max: 10,
    pendingMutation: "NONE",
  },
  initial: "appActive",
  states: {
    appActive: {
      initial: "sync",
      on: {
        TOGGLE_APP_MODE: {
          guard: not("isMutationPending"),
          target: "appInactive",
        },
        SET_MAX: {
          guard: not("isMutationPending"),
          actions: { type: "setMax" },
        },
        SET_STEP: {
          guard: and(["isValidStep", not("isMutationPending")]),
          actions: { type: "setStep" },
        },
        RESET_CONTEXT: {
          guard: not("isMutationPending"),
          actions: { type: "resetContext" },
        },
      },
      states: {
        sync: {
          on: {
            TOGGLE_COUNTER_MODE: { target: "async" },
            SET_COUNT: {
              guard: { type: "isValidCount" },
              actions: { type: "setCountSync" },
            },
          },
        },
        async: {
          on: {
            TOGGLE_COUNTER_MODE: {
              guard: not("isMutationPending"),
              target: "sync",
            },
          },
          initial: "resolved",
          states: {
            resolved: {
              on: {
                SET_COUNT: {
                  guard: { type: "isValidCount" },
                  target: "pending",
                  actions: { type: "setPendingMutation" },
                },
              },
            },
            pending: {
              after: {
                3000: {
                  actions: { type: "setCountAsync" },
                  target: "resolved",
                },
              },
            },
          },
        },
        history: { type: "history", history: "shallow" },
      },
    },
    appInactive: {
      on: {
        TOGGLE_APP_MODE: { target: "appActive.history" },
      },
    },
  },
});

export default createActorContext(appMachine);
