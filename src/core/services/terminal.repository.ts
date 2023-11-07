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
  const groupName = item.get('group');

  const response = await fetch(`${this.url}terminal`, {
    method: "POST",
    body: JSON.stringify({
      ...Object.fromEntries(item),
      group: groupName,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + this.token,
    },
  });


  return response.json() as Promise<Terminal>;
}





async updateTerminal(
  id: Terminal["id"],
  item: FormData
  ): Promise<Terminal> {
    console.log('name', item.get('name'))
    const groupName = item.get('group');


    const response = await fetch(`${this.url}terminal/` + id, {
      method: "POST",
      body: JSON.stringify({
        ...Object.fromEntries(item),
        group: groupName,
        id
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      },
    });
    const updatedTerminal = await response.json();
    console.log('UPDATED TERMINAL',updatedTerminal)
    console.log(item.get('name'))
    return updatedTerminal as Terminal;
  }

  async deleteTerminal(id: Terminal["id"], token: string | undefined): Promise<boolean> {
    if (token) {
      const response = await fetch(`${this.url}terminal/` + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.ok;
    } else {
      console.error("No token available. Cannot delete terminal.");
      return false;
    }
  }
}
