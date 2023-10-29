import { Chat } from "../models/chat";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ChatsState = {
  chats: Chat[];
};

const initialState: ChatsState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    load: (state, action) => {
      state.chats = action.payload;
    },
    create: (state, { payload }) => ({
      ...state,
      chats: [...state.chats, payload],
    }),
    update: (state, action: PayloadAction<Chat>) => {
      const updatedChat = action.payload;
      state.chats = state.chats.map((chat) =>
        chat.id === updatedChat.id ? updatedChat : chat
      );
    },
    remove: (state, action) => {
      const chatId = action.payload;
      state.chats = state.chats.filter(
        (chat) => chat.id !== chatId
      );
    },
  },
});

export const { load, create, update, remove } = chatsSlice.actions;
export default chatsSlice.reducer;
