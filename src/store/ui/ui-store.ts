import { create } from 'zustand';

interface State {
    isSideMenuOpen: boolean;

    // Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,

    // Methods
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),
}));