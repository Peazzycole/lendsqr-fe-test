import { create } from "zustand";

interface AuthStoreState {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (val: boolean) => set({ isAuthenticated: val }),
}));


