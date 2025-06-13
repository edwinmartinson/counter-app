import { Switch } from "@headlessui/react";
import { PowerIcon } from "@heroicons/react/24/outline";

import AppMachineContext from "~/xstate/AppMachine";

export default function BtnPower() {
  const { send } = AppMachineContext.useActorRef();
  const isAppActive = AppMachineContext.useSelector((state) =>
    state.matches("appActive"),
  );

  return (
    <Switch
      checked={isAppActive}
      onChange={() => send({ type: "TOGGLE_APP_MODE" })}
      className="data-[hover]:ring-surface-tertiary data-[active]:bg-surface-tertiary data-checked:bg-content-primary data-checked:text-surface-primary bg-surface-secondary grid size-10 cursor-pointer place-content-center rounded-full ring ring-transparent"
    >
      <PowerIcon className="size-4.5 stroke-2" />
    </Switch>
  );
}
