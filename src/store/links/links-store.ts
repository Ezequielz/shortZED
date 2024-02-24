import { create } from 'zustand';

interface State {
    status: boolean | undefined;
    refreshLinks: boolean
    // Methods
    changeStatus: (status: boolean | undefined) => void;
    changeRefresh: () => void;

}

export const useLinksStore = create<State>()((set) => ({
    status: undefined,
    refreshLinks: false,

    // Methods
    changeStatus: (status) => set({ status }),
    changeRefresh: () => set( (state) => ({

        refreshLinks: !state.refreshLinks
    })
    ),
}));