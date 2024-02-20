import { create } from 'zustand';

interface State {
    isSideMenuOpen: boolean;
    dialog: boolean;
    // Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;

    openDialog: () => void;
    closeDialog: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    dialog: true,
    // Methods
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

    openDialog: () => set({ dialog: true }),
    closeDialog: () => set({ dialog: false }),
}));