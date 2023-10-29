import { Chat } from "../../features/models/chat";
import { ApiRepository } from "./api.repository";

type ApiResponse = {
  items: Chat[];
};
export class ChatRepository extends ApiRepository<Chat> {
  constructor(public url: string, public token: string) {
    super(url, token);
  }

  async getAll(): Promise<Chat[]> {
    const response = await fetch(`${this.url}chat`);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async createChat(item: FormData): Promise<Chat> {
    const response = await fetch(`${this.url}chat`, {
      method: "POST",
      body: item,
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.json() as Promise<Chat>;
  }

  async updateChat(
    id: Chat["id"],
    item: FormData
  ): Promise<Chat> {
    const response = await fetch(`${this.url}chat/` + id, {
      method: "PATCH",
      body: item,
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    const updatedChat = await response.json();
    console.log(updatedChat);
    return updatedChat as Chat;
  }

  async deleteChat(id: Chat["id"]): Promise<boolean> {
    const response = await fetch(`${this.url}chat/` + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    return response.ok;
  }
}
