import { Button } from "@headlessui/react";

type BtnRecProps = {
  children: React.ReactNode;
  action?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function BtnRec({ children, action }: BtnRecProps) {
  return (
    <Button
      className="bg-surface-secondary data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary flex cursor-pointer items-center gap-2 rounded-3xl px-4 py-2 ring ring-transparent"
      onClick={action}
    >
      {children}
    </Button>
  );
}
