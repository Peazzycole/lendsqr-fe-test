import { UsersAPI } from "./users.api";
import apiClient from "./axios";
import { mockUserData } from "@/tests/mockUser";

// Mock the axios client
jest.mock("./axios");
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("UsersAPI", () => {
  const mockUser = mockUserData;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("fetchAllUsers", () => {
    it("successfully fetches users", async () => {
      const mockUsers = [mockUser];
      mockedApiClient.get.mockResolvedValue({ data: mockUsers });

      const result = await UsersAPI.fetchAllUsers();

      expect(mockedApiClient.get).toHaveBeenCalledWith("/users");
      expect(result).toEqual(mockUsers);
    });

    it("returns empty array when no users found", async () => {
      mockedApiClient.get.mockResolvedValue({ data: [] });

      const result = await UsersAPI.fetchAllUsers();

      expect(result).toEqual([]);
    });

    it("handles API errors and throws meaningful error", async () => {
      const apiError = new Error("Network Error");
      mockedApiClient.get.mockRejectedValue(apiError);

      await expect(UsersAPI.fetchAllUsers()).rejects.toThrow(
        "Failed to fetch users"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching users:",
        apiError
      );
    });

    it("handles different error types", async () => {
      mockedApiClient.get.mockRejectedValue("String error");

      await expect(UsersAPI.fetchAllUsers()).rejects.toThrow(
        "Failed to fetch users"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching users:",
        "String error"
      );
    });

    it("calls correct API endpoint", async () => {
      mockedApiClient.get.mockResolvedValue({ data: [] });

      await UsersAPI.fetchAllUsers();

      expect(mockedApiClient.get).toHaveBeenCalledTimes(1);
      expect(mockedApiClient.get).toHaveBeenCalledWith("/users");
    });
  });
});
