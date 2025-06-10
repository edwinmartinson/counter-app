import Counter from "~/components/Counter";
import type { Route } from "./+types/app";
import Settings from "~/components/Settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Counter App" },
    { name: "description", content: "A state machine powered couter" },
  ];
}

export default function Home() {
  return (
    <main className="grid h-full place-content-center">
      <div className="space-y-[100px]">
        <Counter />
        <Settings />
      </div>
    </main>
  );
}
