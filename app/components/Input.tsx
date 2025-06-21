import { Input as InputPrimitive, Field, Label } from "@headlessui/react";
import type React from "react";

import { cn } from "~/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
};

export default function Input({
  label,
  className,
  required,
  ...props
}: InputProps) {
  return (
    <Field className="space-y-2">
      <Label className="block text-sm font-light">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <InputPrimitive
        {...props}
        className={cn(
          "bg-surface-secondary hover:ring-surface-tertiary focus:ring-surface-white block w-full rounded-sm px-4 py-2 ring ring-transparent focus:outline-0",
          className,
        )}
        required={required}
      />
    </Field>
  );
}
