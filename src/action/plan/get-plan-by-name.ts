'use server'

import prisma from '@/lib/prisma';
import { PlanName } from '@prisma/client';

export const getPlanByName = async ( name: PlanName ) => {

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
        return { ok: false, error: error.message }
    }
}