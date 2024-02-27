'use server'

import prisma from '@/lib/prisma';


export const getAllPlans = async () => {

    try {
       const plans = await prisma.plan.findMany()

        return {
            ok: true,
            plans: plans
        }
    } catch (error: any) {
        console.log(error)
        return { ok: false, error: error.message }
    }
}