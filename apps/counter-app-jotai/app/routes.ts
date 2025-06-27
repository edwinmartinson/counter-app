import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("jodi", "routes/jodi.tsx"),
  route("zustand", "routes/zustand.tsx"),
  route("redux", "routes/redux.tsx"),
  route("effector", "routes/effector.tsx"),
  route("xstate", "routes/xstate.tsx"),
] satisfies RouteConfig;
