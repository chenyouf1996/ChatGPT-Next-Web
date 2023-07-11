import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));

export default useUserStore;
