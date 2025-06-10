import BtnRec from "./BtnRec";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Settings() {
  return (
    <div className="flex w-full items-center justify-center">
      <BtnRec>
        <Cog6ToothIcon className="size-4.5 stroke-2" />
        <p>settings</p>
      </BtnRec>
    </div>
  );
}
