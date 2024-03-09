'use server'

import prisma from '@/lib/prisma';


export const getAllPlans = async () => {

    try {
       const plans = await prisma.plan.findMany({
        orderBy: {
            price: 'asc'
        }
       })


       const totalPlansCount = await prisma.plan.count()
  

        return {
            ok: true,
            plans: plans,
            totalPlansCount
        }
    } catch (error: any) {
        console.log(error)
        return { ok: false, error: error.message }
    }
}