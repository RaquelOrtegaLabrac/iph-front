export class ApiRepository<T extends { id: string | number }> {
  constructor(public url: string, public token: string) {    console.log("ApiRepository Token:", this.token); // Agregar este console.log
}

  async getAll(): Promise<T[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    return response.json() as Promise<T[]>;
  }

  async get(id: T["id"]): Promise<T> {
    const response = await fetch(this.url + (id as string));
    return response.json() as Promise<T>;
  }

  async create(item: Partial<T>): Promise<T> {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/json",
      },
    });
    return response.json() as Promise<T>;
  }

  async update(id: T["id"], item: Partial<T>): Promise<T> {
    const response = await fetch(this.url + (id as string), {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/json",
      },
    });
    return response.json() as Promise<T>;
  }

  async delete(id: T["id"]): Promise<boolean> {
    const response = await fetch(this.url + "/" + (id as string), {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return response.ok;
  }
}
