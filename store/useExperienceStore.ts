"use client";

import { create } from "zustand";

export type Quality = "high" | "low";

/**
 * Read inside useFrame / scroll handlers. Writing here does not re-render React.
 * Discrete UI (nav, scene index, preloader) lives in the Zustand store below.
 */
export const experienceRef = {
  storyProgress: 0,
  pointerX: 0,
  pointerY: 0,
  reducedMotion: false,
  isMobile: false,
  quality: "high" as Quality,
};

type Flags = {
  reducedMotion: boolean;
  isMobile: boolean;
  quality: Quality;
};

type ExperienceState = Flags & {
  loadProgress: number;
  introReady: boolean;
  preloaderDone: boolean;
  activeScene: number;
  navSolid: boolean;
  navHidden: boolean;
  menuOpen: boolean;
  setLoadProgress: (value: number) => void;
  setIntroReady: (value: boolean) => void;
  setPreloaderDone: (value: boolean) => void;
  setActiveScene: (value: number) => void;
  syncNav: (scroll: number, direction: 1 | -1 | 0) => void;
  setMenuOpen: (value: boolean) => void;
  setFlags: (flags: Flags) => void;
};

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  loadProgress: 0,
  introReady: false,
  preloaderDone: false,
  activeScene: 0,
  navSolid: false,
  navHidden: false,
  menuOpen: false,
  reducedMotion: false,
  isMobile: false,
  quality: "high",
  setLoadProgress: (loadProgress) => {
    if (get().loadProgress === loadProgress) return;
    set({ loadProgress });
  },
  setIntroReady: (introReady) => set({ introReady }),
  setPreloaderDone: (preloaderDone) => set({ preloaderDone }),
  setActiveScene: (activeScene) => {
    if (get().activeScene === activeScene) return;
    set({ activeScene });
  },
  syncNav: (scroll, direction) => {
    const navSolid = scroll > 24;
    const navHidden = scroll > 140 && direction === 1;
    const current = get();
    if (current.navSolid === navSolid && current.navHidden === navHidden) return;
    set({ navSolid, navHidden });
  },
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setFlags: (flags) => set(flags),
}));
