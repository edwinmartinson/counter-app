import { Switch } from "@headlessui/react";

type ToggleProps = {
  enabled: boolean;
  onChange?: (arg: boolean) => void;
};

export default function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className="group bg-surface-tertiary data-checked:bg-content-primary relative flex h-7 w-14 cursor-pointer rounded-full p-1 ease-in-out focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white"
    >
      <span
        aria-hidden="true"
        className="bg-content-primary group-data-checked:bg-surface-tertiary pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  );
}
