import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import usersSlice from "../../features/redux/users.slice";
import terminalsSlice from "../../features/redux/terminal.slice";
import chatsSlice from "../../features/redux/chat.slice";
import groupsSlice from "../../features/redux/group.slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    terminals: terminalsSlice,
    chats: chatsSlice,
    groups: groupsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
