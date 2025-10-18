import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

interface WindowStore {
  windows: Record<string, WindowState>;
  maxZIndex: number;
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: {},
  maxZIndex: 100,

  openWindow: (id, title) =>
    set((state) => {
      if (state.windows[id]) {
        return state;
      }
      return {
        windows: {
          ...state.windows,
          [id]: {
            id,
            title,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            x: Math.random() * 100 + 50,
            y: Math.random() * 100 + 50,
            width: 600,
            height: 400,
            zIndex: state.maxZIndex + 1,
          },
        },
        maxZIndex: state.maxZIndex + 1,
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const newWindows = { ...state.windows };
      delete newWindows[id];
      return { windows: newWindows };
    }),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: true,
        },
      },
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMaximized: true,
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight - 28,
        },
      },
    })),

  restoreWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: false,
          isMaximized: false,
        },
      },
    })),

  focusWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          zIndex: state.maxZIndex + 1,
        },
      },
      maxZIndex: state.maxZIndex + 1,
    })),

  updateWindowPosition: (id, x, y) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          x,
          y,
        },
      },
    })),

  updateWindowSize: (id, width, height) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          width,
          height,
        },
      },
    })),
}));

