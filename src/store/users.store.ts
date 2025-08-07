import type { UserDto } from "@/types/user.types";
import { calculateStats } from "@/utils";
import { toast } from "react-toastify";
import { create } from "zustand";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

interface UsersStore {
  users: UserDto[];
  stats: UserStats;

  setUsers: (users: UserDto[]) => void;

  activateUser: (userId: string) => void;
  deactivateUser: (userId: string) => void;
  blacklistUser: (userId: string) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0,
  },

  setUsers: (users) => {
    set({ users });
    set({
      stats: calculateStats(users),
    });
  },

  activateUser: (userId) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === userId ? { ...user, status: "active" } : user
      );

      return {
        users: updatedUsers,
        stats: calculateStats(updatedUsers),
      };
    });
    toast.success("Successful activated user");
  },

  deactivateUser: (userId) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === userId ? { ...user, status: "inactive" } : user
      );

      return {
        users: updatedUsers,
        stats: calculateStats(updatedUsers),
      };
    });
    toast.success("Successful deactivated user");
  },

  blacklistUser: (userId) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === userId ? { ...user, status: "blacklisted" } : user
      );
      return {
        users: updatedUsers,
        stats: calculateStats(updatedUsers),
      };
    });
    toast.success("Successful blacklisted user");
  },
}));
