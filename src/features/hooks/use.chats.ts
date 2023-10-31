import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatRepository } from "../../core/services/chat.repository";
import { AppDispatch, RootState } from "../../core/store/store";
import { create, load, update, remove } from "../redux/chat.slice";
import { url } from "../components/config";
import { Chat } from "../models/chat";

export function useChats() {
  const { chats } = useSelector((state: RootState) => state.chats);
  const { token } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const chatRepo: ChatRepository = useMemo(
    () => new ChatRepository(url, token as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleLoadChats = useCallback(async () => {
    const chats = await chatRepo.getAll();
    dispatch(load(chats));
  }, [dispatch, chatRepo]);


  const handleCreateChat = async (chat: FormData) => {
    const newChat = await chatRepo.createChat(chat);
    dispatch(create(newChat));
  };

  const handleUpdateChat = async (
    id: Chat["id"],
    updatedChat: FormData
  ) => {
    try {
      const updatedChatData = await chatRepo.updateChat(
        id,
        updatedChat
      );
      console.log("Updated Chat Data:", updatedChatData);

      dispatch(update(updatedChatData));
      console.log("Redux State After Update:", chats); // Asegúrate de ajustar el nombre del estado si es diferente
    } catch (error) {
      console.error("Error updating chat:", error);
    }
  };

  const handleDeleteChat = async (id: Chat["id"]) => {
    const deletedChat = await chatRepo.deleteChat(id);
    dispatch(remove(deletedChat));
  };

  return {
    handleLoadChats,
    handleCreateChat,
    handleUpdateChat,
    handleDeleteChat,
    chats,
    chatRepo,
    url,
  };
}
