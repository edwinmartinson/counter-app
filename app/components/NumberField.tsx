import { Input } from "@headlessui/react";
import { useEffect, useRef } from "react";

type NumberFieldProps = {
  value?: number;
  defaultValue?: number;
  handleValue?: (value: number) => void;
};

export default function NumberField({
  value,
  defaultValue,
  handleValue,
}: NumberFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const element = inputRef.current;
    if (!element) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        const value = Number.parseInt(inputRef.current?.value || "0");
        if (handleValue) handleValue(value);
      }
    }

    element.addEventListener("keydown", handleKeyDown);

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Input
      defaultValue={defaultValue}
      value={value}
      ref={inputRef}
      className="h-7 w-14 rounded-sm"
      type="number"
    />
  );
}
