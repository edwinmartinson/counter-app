import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import BtnCircle from "./BtnCircle";
import AppMachineContext from "~/xstate/appMachine";

export default function Reset() {
  const { send } = AppMachineContext.useActorRef();

  const isAppInactive = AppMachineContext.useSelector((state) =>
    state.matches("appInactive"),
  );

  const handleReset = () => send({ type: "RESET_CONTEXT" });

  return (
    <BtnCircle disabled={isAppInactive} large action={handleReset}>
      <ArrowUturnLeftIcon className="size-6 stroke-3" />
    </BtnCircle>
  );
}
