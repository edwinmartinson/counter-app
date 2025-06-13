import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import BtnCircle from "./BtnCircle";
import AppMachineContext from "~/xstate/appMachine";
import { padWithZeros } from "~/lib/utils";

export default function Steps() {
  const { send } = AppMachineContext.useActorRef();

  const state = AppMachineContext.useSelector(
    (state) => {
      return {
        step: state.context.step,
        isAppInactive: state.matches("appInactive"),
      };
    },
    (a, b) => a.step === b.step && a.isAppInactive === b.isAppInactive,
  );

  const handle = {
    increment: () => send({ type: "SET_STEP", value: "INCREMENT" }),
    decrement: () => send({ type: "SET_STEP", value: "DECREMENT" }),
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <BtnCircle disabled={state.isAppInactive} action={handle.increment}>
          <PlusIcon className="size-4.5 stroke-2" />
        </BtnCircle>

        <p className="text-lg">{padWithZeros(state.step, 2)}</p>

        <BtnCircle disabled={state.isAppInactive} action={handle.decrement}>
          <MinusIcon className="size-4.5 stroke-2" />
        </BtnCircle>
      </div>

      <p className="text-content-tertiary">Steps</p>
    </div>
  );
}
