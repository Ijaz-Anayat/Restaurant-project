"use client";

import { create } from "zustand";

type Toast = { id: number; message: string };

type UiState = {
  drawerOpen: boolean;
  whatsappOpen: boolean;
  toast: Toast | null;
  bumpToken: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  openWhatsapp: () => void;
  closeWhatsapp: () => void;
  showToast: (message: string) => void;
  requestBump: () => void;
};

let toastTimer = 0;

export const useUiStore = create<UiState>((set, get) => ({
  drawerOpen: false,
  whatsappOpen: false,
  toast: null,
  bumpToken: 0,
  openDrawer: () => set({ drawerOpen: true, whatsappOpen: false }),
  closeDrawer: () => set({ drawerOpen: false, whatsappOpen: false }),
  toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),
  openWhatsapp: () => set({ whatsappOpen: true }),
  closeWhatsapp: () => set({ whatsappOpen: false }),
  showToast: (message) => {
    const id = Date.now();
    set({ toast: { id, message } });
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      if (get().toast?.id === id) set({ toast: null });
    }, 2200);
  },
  requestBump: () => set((state) => ({ bumpToken: state.bumpToken + 1 })),
}));
