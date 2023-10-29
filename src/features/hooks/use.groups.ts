import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupRepository } from "../../core/services/group.repository";
import { AppDispatch, RootState } from "../../core/store/store";
import { create, load, update, remove } from "../redux/group.slice";
import { url } from "../components/config";
import { Group } from "../models/group";

export function useGroups() {
  const { groups } = useSelector((state: RootState) => state.groups);
  const { token } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const groupRepo: GroupRepository = useMemo(
    () => new GroupRepository(url, token as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleLoadGroups = useCallback(async () => {
    const groups = await groupRepo.getAll();
    dispatch(load(groups));
  }, [dispatch, groupRepo]);

  const handleCreateGroup = async (group: FormData) => {
    const newGroup = await groupRepo.createGroup(group);
    dispatch(create(newGroup));
  };

  const handleUpdateGroup = async (
    id: Group["id"],
    updatedGroup: FormData
  ) => {
    try {
      const updatedGroupData = await groupRepo.updateGroup(
        id,
        updatedGroup
      );
      console.log("Updated Group Data:", updatedGroupData);

      dispatch(update(updatedGroupData));
      console.log("Redux State After Update:", groups); // Asegúrate de ajustar el nombre del estado si es diferente
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handleDeleteGroup = async (id: Group["id"]) => {
    const deletedGroup = await groupRepo.deleteGroup(id);
    dispatch(remove(deletedGroup));
  };

  return {
    handleLoadGroups,
    handleCreateGroup,
    handleUpdateGroup,
    handleDeleteGroup,
    groups,
    groupRepo,
    url,
  };
}
