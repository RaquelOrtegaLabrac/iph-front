import { ApiRepository } from "./api.repository";

interface ExampleItem {
  id: string;
  name: string;
}

describe("ApiRepository", () => {
  let repository: ApiRepository<ExampleItem>;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    repository = new ApiRepository<ExampleItem>(
      "http://example.com/api/",
      "token"
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("getAll should fetch and return items", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue([{ id: "1", name: "Item 1" }]),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.getAll();

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/");
    expect(result).toEqual([{ id: "1", name: "Item 1" }]);
  });

  test("getAll should throw an error when the response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    await expect(repository.getAll()).rejects.toThrow(
      "Error: 500. Internal Server Error"
    );

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/");
  });

  test("get should fetch and return a single item", async () => {
    const itemId = "1";

    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: itemId, name: "Item 1" }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.get(itemId);

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/1");
    expect(result).toEqual({ id: itemId, name: "Item 1" });
  });

  test("create should send a POST request and return the created item", async () => {
    const item = {
      name: "New Item",
    };

    const mockResponse = {
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue({ id: "1", name: "New Item" }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.create(item);

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual({ id: "1", name: "New Item" });
  });

  test("update should send a PATCH request and return the updated item", async () => {
    const itemId = "1";
    const item = {
      name: "Updated Item",
    };

    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: itemId, name: "Updated Item" }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.update(itemId, item);

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/1", {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual({ id: itemId, name: "Updated Item" });
  });

  test("delete should send a DELETE request and return true", async () => {
    const itemId = "1";

    const mockResponse = {
      ok: true,
      status: 200,
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.delete(itemId);

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/1", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: itemId }),
    });
    expect(result).toBe(true);
  });

  test("delete should return false when the response is not ok", async () => {
    const itemId = "1";

    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.delete(itemId);

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/1", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: itemId }),
    });
    expect(result).toBe(false);
  });
});
