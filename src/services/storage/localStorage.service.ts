import type { UserDto } from "@/types/user.types";

// Save user details to local storage
export const saveUserDetails = (key: string, data: UserDto) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save user details:", error);
    throw error;
  }
};

// Retrieve user details from local storage
export const getUserDetails = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve user details:", error);
    throw error;
  }
};

// Remove user details from local storage
export const removeUserDetails = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove user details:", error);
    throw error;
  }
};


