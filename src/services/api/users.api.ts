// src/services/api/users.api.ts
import type { UserDto } from "@/types/user.types";
import apiClient from "./axios";

export const UsersAPI = {
  fetchAllUsers: async (): Promise<UserDto[]> => {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  },
};


