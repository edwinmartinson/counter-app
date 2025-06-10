import { Button } from "@headlessui/react";
import { cn } from "~/lib/utils";

type BtnCircleProps = {
  children: React.ReactNode;
  large?: boolean;
  isLoading?: boolean;
  percentage?: number;
  action?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function BtnCircle({
  children,
  action,
  isLoading,
  large,
  percentage,
}: BtnCircleProps) {
  const style = {
    background: `linear-gradient(90deg, var(--color-surface-tertiary) ${percentage}%, var(--color-surface-secondary) ${percentage}%)`,
  };

  return (
    <Button
      onClick={action}
      style={isLoading ? style : {}}
      className={cn(
        "data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary grid cursor-pointer place-content-center rounded-full ring ring-transparent",
        large ? "size-20" : "size-10",
        !isLoading && "bg-surface-secondary",
      )}
    >
      {children}
    </Button>
  );
}
