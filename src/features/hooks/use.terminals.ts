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

  const handleUpdateTerminal = async (
    id: Terminal["id"],
    updatedTerminal: FormData
  ) => {
    try {
      const updatedTerminalData = await terminalRepo.updateTerminal(
        id,
        updatedTerminal
      );
      console.log("Updated Terminal Data:", updatedTerminalData);

      dispatch(update(updatedTerminalData));
      console.log("Redux State After Update:", terminals); // Asegúrate de ajustar el nombre del estado si es diferente
    } catch (error) {
      console.error("Error updating terminal:", error);
    }
  };

  const handleDeleteTerminal = async (id: Terminal["id"]) => {
    const deletedTerminal = await terminalRepo.deleteTerminal(id);
    dispatch(remove(deletedTerminal));
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
