import {
  PlusIcon,
  ArrowUturnLeftIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import BtnCircle from "./BtnCircle";

export default function Counter() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <BtnCircle action={() => console.log("Increment step")}>
            <PlusIcon className="size-4.5 stroke-2" />
          </BtnCircle>

          <p className="text-lg">10</p>

          <BtnCircle action={() => console.log("Decrement step.")}>
            <MinusIcon className="size-4.5 stroke-2" />
          </BtnCircle>
        </div>

        <p className="text-content-tertiary">Steps</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-10">
          <BtnCircle large action={() => console.log("Increment count")}>
            <PlusIcon className="size-6 stroke-3" />
          </BtnCircle>

          <p className="text-5xl">001</p>

          <BtnCircle large action={() => console.log("Decrement count.")}>
            <MinusIcon className="size-6 stroke-3" />
          </BtnCircle>
        </div>

        <p className="text-content-tertiary">Max step: 100</p>
      </div>

      <BtnCircle large action={() => console.log("Reset counter.")}>
        <ArrowUturnLeftIcon className="size-6 stroke-3" />
      </BtnCircle>
    </div>
  );
}
