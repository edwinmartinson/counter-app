import type { Route } from "./+types/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Counter App" },
    { name: "description", content: "A state machine powered couter" },
  ];
}

export default function Home() {
  return (
    <main className="grid h-full place-content-center">
      <h1>The counter app</h1>
    </main>
  );
}
