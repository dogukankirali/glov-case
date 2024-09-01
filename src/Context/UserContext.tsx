import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserContextType = {
  user: User.User | null;
  setUser: (user: User.User | null) => void;
  updateUserInfo: (user: Partial<User.User>) => void;
};

export const useUserStore = create<UserContextType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUserInfo: (user) =>
        set((state) =>
          state?.user ? { user: { ...state.user, ...user } } : state
        ),
    }),
    {
      name: "user-storage",
    }
  )
);

export const useUser = () => {
  const store = useUserStore();
  // if (!store.user) throw new Error("User is not defined");
  return store as Omit<UserContextType, "user"> & {
    user: User.User;
  };
};
