import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import Toggle from "./Toggle";
import NumberField from "./NumberField";
import AppMachineContext from "~/xstate/appMachine";

export default function Options() {
  const { send } = AppMachineContext.useActorRef();

  const state = AppMachineContext.useSelector(
    (state) => {
      return {
        maxCount: state.context.max,
        isAppInactive: state.matches("appInactive"),
        isAsyncEnabled: state.matches({ appActive: "async" }),
      };
    },
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
  );

  const handle = {
    maxChange: (value: number) => send({ type: "SET_MAX", value }),
    asyncMode: () => send({ type: "TOGGLE_COUNTER_MODE" }),
  };

  return (
    <Popover>
      <PopoverButton
        disabled={state.isAppInactive}
        className="bg-surface-secondary data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary flex cursor-pointer items-center gap-2 rounded-3xl px-4 py-2 ring ring-transparent data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-400"
      >
        <p>options</p>
      </PopoverButton>

      <PopoverPanel
        transition
        anchor="top"
        className="bg-surface-secondary/60 ring-surface-tertiary w-[340px] gap-4 space-y-4 rounded-2xl p-6 ring backdrop-blur-sm transition duration-50 ease-in-out [--anchor-gap:--spacing(4)] data-closed:-translate-y-[-8px] data-closed:opacity-0"
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-content-secondary">Max count</p>
          <NumberField
            defaultValue={state.maxCount}
            handleValue={handle.maxChange}
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-content-secondary">Async mode</p>
          <Toggle enabled={state.isAsyncEnabled} onChange={handle.asyncMode} />
        </div>
      </PopoverPanel>
    </Popover>
  );
}
