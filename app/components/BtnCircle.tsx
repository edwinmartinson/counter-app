import { Button } from "@headlessui/react";
import { cn } from "~/lib/utils";

type BtnCircleProps = {
  children: React.ReactNode;
  large?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  action?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function BtnCircle({
  children,
  action,
  isLoading,
  large,
  disabled,
}: BtnCircleProps) {
  return (
    <Button
      onClick={action}
      disabled={disabled}
      className={cn(
        "bg-surface-secondary data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary grid cursor-pointer place-content-center rounded-full ring ring-transparent data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-400",
        large ? "size-20" : "size-10",
        isLoading && "animate-pulse",
      )}
    >
      {children}
    </Button>
  );
}
