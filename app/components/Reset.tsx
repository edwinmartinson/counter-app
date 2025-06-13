import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import BtnCircle from "./BtnCircle";
import AppMachineContext from "~/xstate/AppMachine";

export default function Reset() {
  const isAppInactive = AppMachineContext.useSelector((state) =>
    state.matches("appInactive"),
  );

  return (
    <BtnCircle
      disabled={isAppInactive}
      large
      action={() => console.log("Reset counter.")}
    >
      <ArrowUturnLeftIcon className="size-6 stroke-3" />
    </BtnCircle>
  );
}
