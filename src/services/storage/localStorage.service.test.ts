import { mockUserData } from "@/tests/mockUser";
import {
  saveUserDetails,
  getUserDetails,
  removeUserDetails,
} from "./localStorage.service";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("LocalStorage Service", () => {
  const mockUser = mockUserData;

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe("saveUserDetails", () => {
    it("saves user data to localStorage", () => {
      saveUserDetails("user-123", mockUser);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user-123",
        JSON.stringify(mockUser)
      );
    });

    it("handles different keys", () => {
      saveUserDetails("current-user", mockUser);
      saveUserDetails("selected-user", mockUser);

      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "current-user",
        JSON.stringify(mockUser)
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "selected-user",
        JSON.stringify(mockUser)
      );
    });
  });

  describe("getUserDetails", () => {
    it("retrieves and parses user data from localStorage", () => {
      localStorage.setItem("user-123", JSON.stringify(mockUser));

      const result = getUserDetails("user-123");

      expect(localStorage.getItem).toHaveBeenCalledWith("user-123");
      expect(result).toEqual(mockUser);
    });

    it("returns null when key does not exist", () => {
      const result = getUserDetails("non-existent-key");

      expect(result).toBeNull();
    });

    it("returns null when localStorage returns null", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getUserDetails("empty-key");

      expect(result).toBeNull();
    });
  });

  describe("removeUserDetails", () => {
    it("removes user data from localStorage", () => {
      removeUserDetails("user-123");

      expect(localStorage.removeItem).toHaveBeenCalledWith("user-123");
    });

    it("handles removing non-existent keys", () => {
      removeUserDetails("non-existent");

      expect(localStorage.removeItem).toHaveBeenCalledWith("non-existent");
      expect(() => removeUserDetails("non-existent")).not.toThrow();
    });
  });

  describe("Error handling", () => {
    it("handles localStorage setItem errors", () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      expect(() => saveUserDetails("test", mockUser)).toThrow(
        "Storage quota exceeded"
      );
    });
  });
});
