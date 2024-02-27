'use server'

import prisma from '@/lib/prisma';
import { Plan } from '@prisma/client';
import { revalidatePath } from 'next/cache';



export const updateLinkPlan = async ( userId: string, hash: string, plan: Plan) => {

    if (!hash) {
        return {
            ok: false,
            message: 'Debe introducir un hash'
        };
    };

    hash?.trim();

    // Buscar si existe el url en la base de datos
    const urlExists = await prisma.link.findFirst({
        where: {
            shortUrl: hash,
            userId: userId
        },
        select: {
            id: true,
            updatedAt: true,
            limit: true
        }
    });
    // console.log(urlExists)

    if (!urlExists) {
        return {
            ok: false,
            message: 'El url no existe'
        };
    };

 

    try {

        const planLimit = await prisma.plan.findFirst({
            where: {
                name: plan.name
            },
            select: {
                limit: true
            }
        })

        if (!planLimit) {
            return {
                ok: false,
                message: 'No se encontró el plan'
            };
        }

        if (!urlExists.limit) {
            return {
                ok: false,
                message: 'Tienes el plan super, con clicks ilimitados'
            };
        }

        await prisma.link.update({
            where: {
                id: urlExists.id
            },
            data: {
                // shortUrl: hash,
                limit: !planLimit.limit ? null : urlExists.limit + planLimit.limit,
                updatedAt:  new Date( Date.now() )
            }
        });

        revalidatePath('/')
        revalidatePath('/payment')
        revalidatePath(`/payment/${hash}`)

        return {
            ok: true,
            message: 'plan actualizado',
        };

    } catch (error: any) {

        console.log(error);
        return {
            ok: false,
            message: error.message
        };
    }




}