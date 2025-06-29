import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ConfigParam, Context, Operation } from "package-types";
import type { RootState } from "./store";

const initialState: Context = {
  step: 1,
  count: 0,
  max: 10,
  delay: 3,
  isDelayed: false,
  isLoading: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset(state) {
      if (state.isLoading) return;

      state.step = 1;
      state.count = 0;
      state.max = 10;
      state.delay = 3;
      state.isDelayed = false;
      state.isLoading = false;
    },
    config(state, action: PayloadAction<ConfigParam>) {
      if (state.isLoading) return;

      state.max = action.payload.max;
      state.delay = action.payload.delay;
      state.isDelayed = action.payload.isDelayed;
    },
    step(state, action: PayloadAction<Operation>) {
      if (state.isLoading) return;

      if (action.payload === "INC") {
        state.step = state.step + 1;
      }

      if (action.payload === "DEC" && state.step - 1 >= 1) {
        state.step = state.step - 1;
      }
    },
    count(state, action: PayloadAction<Operation>) {
      if (state.isLoading) return;

      if (action.payload === "INC" && state.count + state.step <= state.max) {
        state.count = state.count + state.step;
      }

      if (action.payload === "DEC" && state.count - state.step >= 0) {
        state.count = state.count - state.step;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(delayedCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delayedCount.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload === "INC") {
          state.count = state.count + state.step;
        }

        if (action.payload === "DEC") {
          state.count = state.count - state.step;
        }
      })
      .addCase(delayedCount.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export const delayedCount = createAsyncThunk<
  Operation,
  Operation,
  { state: RootState }
>("counter/delayedCount", async (args, { getState }) => {
  const state = getState();

  return new Promise((resolve) => {
    setTimeout(() => resolve(args), state.counter.delay * 1000);
  });
});

export const { reset, config, step, count } = counterSlice.actions;
export default counterSlice.reducer;
