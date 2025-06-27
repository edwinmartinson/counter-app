import { Button as Btn } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const variants = cva("font-medium cursor-pointer", {
  variants: {
    variant: {
      primary:
        "w-full py-2 px-3 bg-surface-white text-content-black rounded-md hover:bg-surface-white/95 active:bg-surface-white/90 data-[disabled]:cursor-not-allowed",
      pilled:
        "bg-surface-secondary data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary flex cursor-pointer items-center gap-2 rounded-3xl px-4 py-2 ring ring-transparent data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-400",
      rounded:
        "bg-surface-secondary data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary grid cursor-pointer place-content-center rounded-full ring ring-transparent data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-400",
    },
    size: {
      md: "size-10",
      lg: "size-20",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof variants> & {};

export default function Button({
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <Btn {...props} className={cn(variants({ variant, size }))}>
      {children}
    </Btn>
  );
}
