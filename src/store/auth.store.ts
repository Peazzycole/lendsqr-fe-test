import { create } from "zustand";

interface AuthStoreState {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: true,
  setIsAuthenticated: (val: boolean) => set({ isAuthenticated: val }),
}));
