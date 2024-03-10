'use server'

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { PlanName, Role } from '@prisma/client';
import { z } from 'zod';

interface Data {
    price: number;
    limit: number | null;
};


export const updatePlanByAdmin = async (updatePlan: Data, planName: PlanName ) => {
  
    const session = await auth();

    if (!session || session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción'
        };
    };

    const schemaPlan = z.object({
        price: z.number().positive().optional(),
        limit: z.number().positive().optional().nullable(),
    }).safeParse({ updatePlan });

    if (!schemaPlan.success) {
        console.log(schemaPlan.error.issues[0].message);
         return {
            ok: false,
            message: 'Los valores no son aceptables'
        };
     };

    try {

        // Buscar si existe el url en la base de datos
        const planExists = await prisma.plan.findFirst({
            where: {
                name: planName,
            }
        });

        if (!planExists) {
            return {
                ok: false,
                message: 'El plan que intentas actualizar no existe'
            };
        };

       
        await prisma.plan.update({
            where: {
                id: planExists.id,
            },
            data: {
                price: +updatePlan.price,
                limit: updatePlan.limit === 0 || updatePlan.limit === null ? null : +updatePlan.limit,
            }
        });

        revalidatePath('/');
        revalidatePath(`/admin/plans`);
        revalidatePath(`/admin/plans?plan=${planName}`);

        return {
            ok: true,
            message: `Plan ${planName} actualizado`,
        };

    } catch (error: any) {
        console.log(error);
        let message = `No se pudo actualizar el plan: ${planName}`;

        return {
            ok: false,
            message: message
        };
    }
}