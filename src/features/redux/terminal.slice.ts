import { Terminal } from "../models/terminal";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TerminalsState = {
  terminals: Terminal[];
};

const initialState: TerminalsState = {
  terminals: [],
};

const terminalsSlice = createSlice({
  name: "terminals",
  initialState,
  reducers: {
    load: (state, action) => {
      state.terminals = action.payload;
    },
    create: (state, { payload }) => ({
      ...state,
      terminals: [...state.terminals, payload],
    }),
    update: (state, action: PayloadAction<Terminal>) => {
      const updatedTerminal = action.payload;
      state.terminals = state.terminals.map((terminal) =>
        terminal.id === updatedTerminal.id ? updatedTerminal : terminal
      );
    },
    remove: (state, action) => {
      const terminalId = action.payload;
      state.terminals = state.terminals.filter(
        (terminal) => terminal.id !== terminalId
      );
    },
  },
});

export const { load, create, update, remove } = terminalsSlice.actions;
export default terminalsSlice.reducer;
