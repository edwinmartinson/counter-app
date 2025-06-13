import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import BtnCircle from "./BtnCircle";
import { padWithZeros } from "~/lib/utils";
import AppMachineContext from "~/xstate/appMachine";

export default function Counter() {
  const { send } = AppMachineContext.useActorRef();

  const state = AppMachineContext.useSelector(
    (state) => ({
      count: state.context.count,
      maxCount: state.context.max,
      loadingMutation: state.context.pendingMutation,
      isAppInactive: state.matches("appInactive"),
      isAsyncEnabled: state.matches({ appActive: "async" }),
    }),
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
  );

  const handle = {
    increment: () => send({ type: "SET_COUNT", value: "INCREMENT" }),
    decrement: () => send({ type: "SET_COUNT", value: "DECREMENT" }),
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-10">
        <BtnCircle
          disabled={state.isAppInactive}
          large
          action={handle.increment}
          isLoading={state.loadingMutation === "INC"}
        >
          <PlusIcon className="size-6 stroke-3" />
        </BtnCircle>

        <p className="text-5xl">{padWithZeros(state.count, 2)}</p>

        <BtnCircle
          disabled={state.isAppInactive}
          large
          action={handle.decrement}
          isLoading={state.loadingMutation === "DEC"}
        >
          <MinusIcon className="size-6 stroke-3" />
        </BtnCircle>
      </div>

      <p className="text-content-tertiary text-center">
        Max step: {state.maxCount}
        <br />
        {state.isAppInactive
          ? "(disabled)"
          : state.isAsyncEnabled
            ? "(async)"
            : "(sync)"}
      </p>
    </div>
  );
}
