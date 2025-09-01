import { create } from 'zustand';

interface AppState {
  sidebarOpen: boolean;
  pageTitle: string;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setPageTitle: (title: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  pageTitle: '',
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setPageTitle: (title: string) => set({ pageTitle: title }),
}));