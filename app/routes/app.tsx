import type { Route } from "./+types/app";

import AppMachineContext from "~/xstate/appMachine";
import Steps from "~/components/Steps";
import Counter from "~/components/Counter";
import Reset from "~/components/Reset";
import BtnPower from "~/components/BtnPower";
import Options from "~/components/Options";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Counter App" },
    { name: "description", content: "A state machine powered couter" },
  ];
}

export default function Home() {
  return (
    <AppMachineContext.Provider>
      <main className="grid h-full place-content-center">
        <div className="space-y-[100px]">
          <div className="flex flex-col items-center gap-10">
            <Steps />
            <Counter />
            <Reset />
          </div>

          <div className="flex w-full items-center justify-center gap-2">
            <BtnPower />
            <Options />
          </div>
        </div>
      </main>
    </AppMachineContext.Provider>
  );
}
