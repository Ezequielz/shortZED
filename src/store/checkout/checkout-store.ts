import { PlanName } from '@prisma/client';
import { create } from 'zustand';

interface State {
    plan: PlanName;
    code: Code;
    // Methods
    changePlan: (plan: PlanName ) => void;
    setCode: (code: Code) => void;

}

type Code = {
    isActive: boolean
    discount: number
    name: string
};

export const useCheckoutStore = create<State>()((set) => ({
    plan: 'super',
    code: {
        name: '',
        discount: 0,
        isActive: false
    },
 
    // Methods
    changePlan: (plan) => set({ plan }),
    setCode: (code) => set({ code })
}));