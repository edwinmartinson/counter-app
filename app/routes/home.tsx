import { href, NavLink } from "react-router";
import type { Route } from "./+types/home";
import { cn } from "~/lib/utils";

export default function Home({}: Route.ComponentProps) {
  return (
    <main className="grid h-full place-content-center px-4">
      <section className="flex flex-col items-center gap-10">
        <div className="flex flex-wrap justify-center gap-10">
          <NavLink to={href("/jodi")} className="link">
            {({ isPending }) => (
              <span className={cn(isPending && "animate-pulse")}>👻 jodi</span>
            )}
          </NavLink>

          <NavLink to={href("/zustand")} className="link">
            {({ isPending }) => (
              <span className={cn(isPending && "animate-pulse")}>
                🐻 zustand
              </span>
            )}
          </NavLink>

          <NavLink to={href("/redux")} className="link">
            {({ isPending }) => (
              <span className={cn(isPending && "animate-pulse")}>⚛️ redux</span>
            )}
          </NavLink>

          <NavLink to={href("/effector")} className="link">
            {({ isPending }) => (
              <span className={cn(isPending && "animate-pulse")}>
                ☄️ effector
              </span>
            )}
          </NavLink>

          <NavLink to={href("/xstate")} className="link">
            {({ isPending }) => (
              <span className={cn(isPending && "animate-pulse")}>
                🦾 xstate/store
              </span>
            )}
          </NavLink>
        </div>
        <p className="text-content-secondary">State Managers</p>
      </section>
    </main>
  );
}
