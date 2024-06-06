import { create } from "zustand";

interface JWTState {
  jwt: string | null;
  setJWT: (jwt: string) => void;
  clearJWT: () => void;
}

export const useJWTStore = create<JWTState>((set) => ({
  jwt: null,
  setJWT: (jwt) => set({ jwt }),
  clearJWT: () => set({ jwt: "" }),
}));
