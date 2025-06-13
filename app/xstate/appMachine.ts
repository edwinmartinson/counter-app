import { createActorContext } from "@xstate/react";
import { assertEvent, assign, setup } from "xstate";

export const appMachine = setup({
  types: {
    context: {} as {
      count: number;
      step: number;
      max: number;
    },
    events: {} as
      | { type: "TOGGLE_APP_MODE" }
      | { type: "TOGGLE_COUNTER_MODE" }
      | { type: "SET_MAX"; value: number },
  },
  actions: {
    setMax: assign(({ event }) => {
      assertEvent(event, "SET_MAX");
      return { max: event.value };
    }),
  },
  guards: {},
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqCyyDGALAlgHZgB0aqAgtgC74BuYAxACoDyA4uwDICiA+hQAKgvhlYARHgG0ADAF1EoVAHtY+WssKKQAD0QA2ABwAmEvpkBOAMwB2AKwAaEAE9EViwEYSFu1Y8AWGWM7QxtDCxl9AF8op3IsPCJScipaBkYAZR5mUQoADVkFJBAVNQ0tYr0EKz9vW0cXRGMZL2CYuPQEgmIydFT6UlhnQmwWDm5+AGFWAFUAOWYeACVRCWl5bVL1fE1tKuN9GydXBH8akmNDfX8bKzsLYw9jY392kHicbuS+mgGyIZGY04vD403mixWYkkhU2qm2u0qTUOxzcJhIYWut3uj2er1i706nySvVQAElCDg0kw2MD+EIRFD1kUlHDyntEHZjCiEIYvHYYvjCMoIHBtB9EsRYWUdhVQFV-NyALTRfHir4k-oMKXw2W6AwKxoIYw2GwXGR+QLBULhSJvNXElK-BgkAHYbVsxEIAJWbn+YLo80BIIhMIRFUdTBEnqOqn-YZu4pbD1yjnGKxmSz1X2XM1+czmKyGfweDx2wkS76UJ2kAiwajKABOJxZ0oRKa9T25VmuAYtwetYbLkYrJPJlIG7pl7IQyMNWPRVxudweTzTAqiQA */
  id: "appMachine",
  context: {
    count: 0,
    step: 1,
    max: 10,
  },
  initial: "appActive",
  states: {
    appActive: {
      initial: "sync",
      on: {
        TOGGLE_APP_MODE: {
          target: "#appMachine.appInactive",
        },
        SET_MAX: { actions: { type: "setMax" } },
      },
      states: {
        sync: {
          on: {
            TOGGLE_COUNTER_MODE: { target: "#appMachine.appActive.async" },
          },
        },
        async: {
          on: {
            TOGGLE_COUNTER_MODE: { target: "#appMachine.appActive.sync" },
          },
        },
        history: { type: "history", history: "shallow" },
      },
    },
    appInactive: {
      on: {
        TOGGLE_APP_MODE: { target: "#appMachine.appActive.history" },
      },
    },
  },
});

export default createActorContext(appMachine);
