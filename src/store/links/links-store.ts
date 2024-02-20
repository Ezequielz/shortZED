import { create } from 'zustand';

interface State {
    status: boolean | undefined;

     // Methods
     changeStatus: (status: boolean | undefined ) => void;

}

export const useLinksStore = create<State>()((set) => ({
    status: undefined,

    // Methods
    changeStatus: (status) => set({ status })
}));