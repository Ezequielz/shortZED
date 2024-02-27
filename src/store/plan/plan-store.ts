import { PlanName } from '@prisma/client';
import { create } from 'zustand';

interface State {
    plan:PlanName
    
    // Methods
    changePlan: (plan: PlanName ) => void;

}

export const usePlanStore = create<State>()((set) => ({
    plan: 'super',
 
    // Methods
    changePlan: (plan) => set({ plan }),

}));