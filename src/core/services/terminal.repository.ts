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
    console.log('RESPONSE IN TERMINALREPO', response)
    return response.json() as Promise<Terminal>;
  }

  // async createTerminal(item: Partial<Terminal>): Promise<Terminal> {
  //   const formData = new FormData();

  //   // Agrega los campos relevantes a formData
  //   if (item.name) formData.append('name', item.name.toString());
  //   if (item.battery) formData.append('battery', item.battery.toString());
  //   if (item.wifiLevel) formData.append('wifiLevel', item.wifiLevel.toString());
  //   if (item.isConnected) formData.append('isConnected', item.isConnected.toString());
  //   if (item.group) formData.append('group', item.group.toString());
  //   console.log('DATAAAA ')
  //   for (const value of formData.values()) {
  //     console.log(value);
  //   }
  //   console.log('DATAAA2')

  //   const response = await fetch(`${this.url}terminal`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: formData.get("name"),
  //       battery: formData.get("battery"),
  //       wifiLevel: formData.get("wifiLevel"),
  //       isConnected: formData.get("isConnected"),
  //       group: formData.get("group"),
  //     }),
  //     headers: { Authorization: "Bearer " + this.token },
  //   });
  //   console.log(response.json)

  //   return response.json() as Promise<Terminal>;
  // }


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
    console.log("Deleting terminal with id:", id);

    const response = await fetch(`${this.url}terminal/` + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    return response.ok;
  }
}
