import { Input } from "@headlessui/react";

type TextFieldProps = {
  value: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextField({ value, onChange }: TextFieldProps) {
  return (
    <Input
      className="h-7 w-14 rounded-sm"
      type="number"
      value={value}
      onChange={onChange}
    />
  );
}
