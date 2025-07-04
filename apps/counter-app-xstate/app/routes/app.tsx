import {
  ArrowUturnLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { useAtom, useSelector } from "@xstate/store/react";
import { counter, loadingAtom } from "~/store/xstate";

import { Button } from "package-ui";
import { cn, padWithZeros } from "package-utils";

import type { Route } from "./+types/app";
import Config from "~/components/Config";

export default function App({}: Route.ComponentProps) {
  const context = useSelector(counter, (state) => state.context);
  const isLoading = useAtom(loadingAtom);

  const handle = {
    reset: () => counter.trigger.reset(),
    incrementStep: () => counter.trigger.step({ value: "INC" }),
    decrementStep: () => counter.trigger.step({ value: "DEC" }),
    incrementCount: () => {
      if (context.isDelayed) {
        counter.trigger.delay({ value: "INC" });
      } else counter.trigger.count({ value: "INC" });
    },
    decrementCount: () => {
      if (context.isDelayed) {
        counter.trigger.delay({ value: "DEC" });
      } else counter.trigger.count({ value: "DEC" });
    },
  };

  return (
    <main className="grid h-full place-content-center">
      <div className="space-y-[100px]">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="rounded"
                size="md"
                onClick={handle.incrementStep}
              >
                <PlusIcon className="size-4.5 stroke-2" />
              </Button>

              <p className="text-lg">{padWithZeros(context.step, 2)}</p>

              <Button
                variant="rounded"
                size="md"
                onClick={handle.decrementStep}
              >
                <MinusIcon className="size-4.5 stroke-2" />
              </Button>
            </div>

            <p className="text-content-tertiary">Steps</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-10">
              <Button
                variant="rounded"
                size="lg"
                onClick={handle.incrementCount}
              >
                <PlusIcon className="size-6 stroke-3" />
              </Button>

              <p className={cn("text-5xl", isLoading && "animate-pulse")}>
                {padWithZeros(context.count, 2)}
              </p>

              <Button
                variant="rounded"
                size="lg"
                onClick={handle.decrementCount}
              >
                <MinusIcon className="size-6 stroke-3" />
              </Button>
            </div>

            <p className="text-content-tertiary text-center">
              Max count: {context.max}
            </p>
          </div>

          <Button variant="rounded" size="lg" onClick={handle.reset}>
            <ArrowUturnLeftIcon className="size-6 stroke-3" />
          </Button>
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <Config />
        </div>
      </div>
    </main>
  );
}
