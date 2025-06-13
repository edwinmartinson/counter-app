import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import BtnCircle from "./BtnCircle";
import AppMachineContext from "~/xstate/AppMachine";

export default function Counter() {
  const isAppInactive = AppMachineContext.useSelector((state) =>
    state.matches("appInactive"),
  );
  const isAsyncEnabled = AppMachineContext.useSelector((state) =>
    state.matches({ appActive: "async" }),
  );
  const maxCount = AppMachineContext.useSelector((state) => state.context.max);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-10">
        <BtnCircle
          disabled={isAppInactive}
          large
          action={() => console.log("Increment count")}
        >
          <PlusIcon className="size-6 stroke-3" />
        </BtnCircle>

        <p className="text-5xl">001</p>

        <BtnCircle
          disabled={isAppInactive}
          large
          action={() => console.log("Decrement count.")}
        >
          <MinusIcon className="size-6 stroke-3" />
        </BtnCircle>
      </div>

      <p className="text-content-tertiary text-center">
        Max step: {maxCount}
        <br />
        {isAsyncEnabled ? "(async)" : "(sync)"}
      </p>
    </div>
  );
}
