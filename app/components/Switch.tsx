import {
  Switch as SwitchPrimitive,
  type SwitchProps,
  Field,
  Label,
} from "@headlessui/react";
import { cn } from "~/lib/utils";

type PropsType = SwitchProps & {
  label: string;
  description: string;
};

export default function Switch({
  className,
  label,
  description,
  ...props
}: PropsType) {
  return (
    <Field className="flex items-center justify-between">
      <Label className="space-y-2 text-sm font-light">
        <p>{label}</p>
        <p className="text-content-secondary">{description}</p>
      </Label>

      <SwitchPrimitive
        {...props}
        className={cn(
          "group bg-surface-tertiary data-checked:bg-content-primary relative flex h-7 w-14 cursor-pointer rounded-full p-1 ease-in-out focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="bg-content-primary group-data-checked:bg-surface-tertiary pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
        />
      </SwitchPrimitive>
    </Field>
  );
}
