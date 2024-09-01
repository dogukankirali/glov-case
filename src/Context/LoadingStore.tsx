import { create } from "zustand";

type LoadingStore = {
  loading: boolean;
  startLoading: () => void;
  endLoading: () => void;
  toggleLoading: () => void;
  loadingAction: <T>(action: Promise<T>) => Promise<T>;
};

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  loading: false,
  startLoading: () => set({ loading: true }),
  endLoading: () => set({ loading: false }),
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
  loadingAction: async (action) => {
    set({ loading: true });
    const result = await action;
    set({ loading: false });
    return result;
  },
}));
