import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    href: "/logo.svg",
    type: "image/svg+xml",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Counter App" },
    { name: "description", content: "A state machine powered couter" },
  ];
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let errorType: "NOT_FOUND" | "ERROR" = "NOT_FOUND";
  let errorMsg = "Something somewhere somehow went very wrong.";
  const isError = import.meta.env.DEV && error && error instanceof Error;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorType = "NOT_FOUND";
    } else {
      errorType = "ERROR";
      errorMsg = error.statusText || errorMsg;
    }
  } else if (isError) {
    errorType = "ERROR";
    errorMsg = error.message;
    console.error(error.stack);
  }

  const NotFound = () => {
    return (
      <section className="space-y-[24px] place-self-center text-center">
        <h1 className="text-content-primary text-9xl">
          4<span className="text-content-secondary">0</span>4
        </h1>
        <p className="text-content-secondary">Sorry, page not found.</p>
      </section>
    );
  };

  const AppError = () => {
    return (
      <section className="space-y-[24px] place-self-center text-center">
        <h1 className="text-content-primary text-9xl">
          Err<span className="text-content-secondary">o</span>r
        </h1>
        <p className="text-content-secondary">{errorMsg}</p>
      </section>
    );
  };

  return (
    <main className="grid h-full w-full">
      {errorType === "NOT_FOUND" ? <NotFound /> : <AppError />}
    </main>
  );
}
