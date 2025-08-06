import type { UserDto } from "@/types/user.types";

// Save user details to local storage
export const saveUserDetails = (key: string, data: UserDto) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Retrieve user details from local storage
export const getUserDetails = (key: string): UserDto | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Remove user details from local storage
export const removeUserDetails = (key: string) => {
  localStorage.removeItem(key);
};
