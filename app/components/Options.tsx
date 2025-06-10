import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import Toggle from "./Toggle";
import TextField from "./TextField";

export default function Options() {
  return (
    <div className="flex w-full items-center justify-center">
      <Popover>
        <PopoverButton className="bg-surface-secondary data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary flex cursor-pointer items-center gap-2 rounded-3xl px-4 py-2 ring ring-transparent">
          <p>options</p>
        </PopoverButton>

        <PopoverPanel
          transition
          anchor="top"
          className="bg-surface-secondary/60 ring-surface-tertiary w-[340px] gap-4 space-y-4 rounded-2xl p-6 ring backdrop-blur-sm transition duration-50 ease-in-out [--anchor-gap:--spacing(4)] data-closed:-translate-y-[-8px] data-closed:opacity-0"
        >
          <div className="flex w-full items-center justify-between">
            <p className="text-content-secondary">Max count</p>
            <TextField value={100} onChange={() => {}} />
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-content-secondary">Disable app counter</p>
            <Toggle enabled={true} />
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-content-secondary">Enable async mode</p>
            <Toggle enabled={false} />
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
