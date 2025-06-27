import {
  ArrowUturnLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

import type { Route } from "./+types/app";
import { Button } from "package-ui";
import { padWithZeros } from "~/lib/utils";
import Config from "~/components/Config";

export default function Jodi({}: Route.ComponentProps) {
  return (
    <main className="grid h-full place-content-center">
      <div className="space-y-[100px]">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="rounded" size="md">
                <PlusIcon className="size-4.5 stroke-2" />
              </Button>

              <p className="text-lg">{padWithZeros(0, 2)}</p>

              <Button variant="rounded" size="md">
                <MinusIcon className="size-4.5 stroke-2" />
              </Button>
            </div>

            <p className="text-content-tertiary">Steps</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-10">
              <Button variant="rounded" size="lg">
                <PlusIcon className="size-6 stroke-3" />
              </Button>

              <p className="text-5xl">{padWithZeros(0, 2)}</p>

              <Button variant="rounded" size="lg">
                <MinusIcon className="size-6 stroke-3" />
              </Button>
            </div>

            <p className="text-content-tertiary text-center">Max step: {10}</p>
          </div>

          <Button variant="rounded" size="lg">
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
