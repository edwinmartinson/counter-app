# Counter App: State Management Playground

This project is a simple counter app designed to test and compare various state management solutions in the React ecosystem. It provides implementations using the following libraries:

- [Jotai](https://jotai.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Effector](https://effector.dev/)
- [XState/Store](https://xstate.js.org/docs/packages/xstate-store/)

## Project Structure

```
apps/
  counter-app-jotai/      # Jotai implementation
  counter-app-zustand/    # Zustand, Redux Toolkit, Effector, XState implementations
packages/
  ui/                    # Shared UI components (Button, Input, Switch)
  utils/                 # Shared utility functions
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run a specific app:**
   ```sh
   # For Jotai
   cd apps/counter-app-jotai
   npm run dev

   # For Zustand, Redux Toolkit, Effector, XState
   cd apps/counter-app-zustand
   npm run dev
   ```

## Purpose

The goal of this project is to provide a side-by-side comparison of popular state management libraries in a real-world, yet simple, application. This helps developers evaluate API ergonomics, performance, and developer experience.

## License

MIT
