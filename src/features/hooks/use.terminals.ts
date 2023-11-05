import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TerminalRepository } from "../../core/services/terminal.repository";
import { AppDispatch, RootState } from "../../core/store/store";
import { create, load, update, remove } from "../redux/terminal.slice";
import { url } from "../components/config";
import { Terminal } from "../models/terminal";

export function useTerminals() {
  const { terminals } = useSelector((state: RootState) => state.terminals);
  const { token } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const terminalRepo: TerminalRepository = useMemo(
    () => new TerminalRepository(url, token as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleLoadTerminals = useCallback(async () => {
    const terminals = await terminalRepo.getAll();
    dispatch(load(terminals));
  }, [dispatch, terminalRepo]);


 const handleCreateTerminal = async (terminal: FormData) => {

  const newTerminal = await terminalRepo.createTerminal(terminal);
  dispatch(create(newTerminal));
};

const handleUpdateTerminal = async (id: Terminal["id"], updatedTerminal: FormData) => {
  try {
    if (id !== undefined) {
      const updatedTerminalData: Terminal = await terminalRepo.updateTerminal(id, updatedTerminal);



      if (updatedTerminalData) {
        dispatch(update(updatedTerminalData));
        console.log('1', updatedTerminalData)


      } else {
        console.error("Error updating terminal or no updated data received.");
      }
    } else {
      console.error("ID is undefined. Please provide a valid ID.");
    }
  } catch (error) {
    console.error("Error updating terminal:", error);
  }
};


  const handleDeleteTerminal = async (id: Terminal["id"], token: string | undefined) => {
    if (token) {
      const isDeleted = await terminalRepo.deleteTerminal(id, token);
      if (isDeleted) {
        dispatch(remove(id));
      } else {
        console.error("Failed to delete the terminal with id:", id);
      }
    } else {
      console.error("No token available. Cannot delete terminal.");
    }
  };

  return {
    handleLoadTerminals,
    handleCreateTerminal,
    handleUpdateTerminal,
    handleDeleteTerminal,
    terminals,
    terminalRepo,
    url,
  };
}
