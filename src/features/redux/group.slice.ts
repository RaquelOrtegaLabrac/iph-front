import { Group } from "../models/group";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type GroupsState = {
  groups: Group[];
};

const initialState: GroupsState = {
  groups: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    load: (state, action) => {
      state.groups = action.payload;
    },
    create: (state, { payload }) => ({
      ...state,
      groups: [...state.groups, payload],
    }),
    update: (state, action: PayloadAction<Group>) => {
      const updatedGroup = action.payload;
      state.groups = state.groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      );
    },
    remove: (state, action) => {
      const groupId = action.payload;
      state.groups = state.groups.filter(
        (group) => group.id !== groupId
      );
    },
  },
});

export const { load, create, update, remove } = groupsSlice.actions;
export default groupsSlice.reducer;
