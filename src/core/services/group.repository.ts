import { Group } from "../../features/models/group";
import { ApiRepository } from "./api.repository";

type ApiResponse = {
  items: Group[];
};
export class GroupRepository extends ApiRepository<Group> {
  constructor(public url: string, public token: string) {
    super(url, token);
  }

  async getAll(): Promise<Group[]> {
    const response = await fetch(`${this.url}group`);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async createGroup(item: FormData): Promise<Group> {
    const response = await fetch(`${this.url}group`, {
      method: "POST",
      body: item,
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.json() as Promise<Group>;
  }

  async updateGroup(
    id: Group["id"],
    item: FormData
  ): Promise<Group> {
    const response = await fetch(`${this.url}group/` + id, {
      method: "PATCH",
      body: item,
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    const updatedGroup = await response.json();
    return updatedGroup as Group;
  }

  async deleteGroup(id: Group["id"]): Promise<boolean> {
    const response = await fetch(`${this.url}group/` + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    return response.ok;
  }
}
