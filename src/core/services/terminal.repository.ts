import { Terminal } from "../../features/models/terminal";
import { ApiRepository } from "./api.repository";

type ApiResponse = {
  items: Terminal[];
};
export class TerminalRepository extends ApiRepository<Terminal> {
  constructor(public url: string, public token: string) {
    super(url, token);
  }

  async getAll(): Promise<Terminal[]> {
    const response = await fetch(`${this.url}terminal`);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async createTerminal(item: FormData): Promise<Terminal> {
    const response = await fetch(`${this.url}terminal`, {
      method: "POST",
      body: item,
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.json() as Promise<Terminal>;
  }

  async updateTerminal(
    id: Terminal["id"],
    item: FormData
  ): Promise<Terminal> {
    const response = await fetch(`${this.url}terminal/` + id, {
      method: "PATCH",
      body: item,
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    const updatedTerminal = await response.json();
    console.log(updatedTerminal);
    return updatedTerminal as Terminal;
  }

  async deleteTerminal(id: Terminal["id"]): Promise<boolean> {
    const response = await fetch(`${this.url}terminal/` + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    return response.ok;
  }
}
