import { Button } from "@headlessui/react";
import { cn } from "~/lib/utils";

type BtnCircleProps = {
  children: React.ReactNode;
  large?: boolean;
  isLoading?: boolean;
  percentage?: number;
  disabled?: boolean;
  action?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function BtnCircle({
  children,
  action,
  isLoading,
  large,
  percentage,
  disabled,
}: BtnCircleProps) {
  const style = {
    background: `linear-gradient(90deg, var(--color-surface-tertiary) ${percentage}%, var(--color-surface-secondary) ${percentage}%)`,
  };

  return (
    <Button
      onClick={action}
      style={isLoading ? style : {}}
      disabled={disabled}
      className={cn(
        "data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary grid cursor-pointer place-content-center rounded-full ring ring-transparent data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-400",
        large ? "size-20" : "size-10",
        !isLoading && "bg-surface-secondary",
      )}
    >
      {children}
    </Button>
  );
}
