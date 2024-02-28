'use server'

import prisma from '@/lib/prisma';

export const getPlanById = async ( id: string ) => {

    try {
       const plan = await prisma.plan.findFirst({
            where: {
                id: id
            }
        })

        return {
            ok: true,
            plan: plan
        }
    } catch (error: any) {
        console.log(error)
        return { ok: false, error: error.message }
    }
}