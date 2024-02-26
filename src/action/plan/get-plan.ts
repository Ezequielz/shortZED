'use server'

import prisma from '@/lib/prisma';

export const getPlan = async ( name: string ) => {

    try {
       const plan = await prisma.plan.findFirst({
            where: {
                name: name
            }
        })

        return {
            ok: true,
            plan: plan
        }
    } catch (error: any) {
        console.log(error)
        return { ok: false, error: error.message ?? 'Error al eliminar url' }
    }
}