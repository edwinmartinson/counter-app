import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import BtnCircle from "./BtnCircle";
import AppMachineContext from "~/xstate/AppMachine";

export default function Steps() {
  const isAppInactive = AppMachineContext.useSelector((state) =>
    state.matches("appInactive"),
  );
  const step = AppMachineContext.useSelector((state) => state.context.step);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <BtnCircle
          disabled={isAppInactive}
          action={() => console.log("Increment step")}
        >
          <PlusIcon className="size-4.5 stroke-2" />
        </BtnCircle>

        <p className="text-lg">001</p>

        <BtnCircle
          disabled={isAppInactive}
          action={() => console.log("Decrement step.")}
        >
          <MinusIcon className="size-4.5 stroke-2" />
        </BtnCircle>
      </div>

      <p className="text-content-tertiary">Steps</p>
    </div>
  );
}
