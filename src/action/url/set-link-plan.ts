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

        const planId = await prisma.plan.findFirst({
            where: {
                name: plan.name
            },
            select: {
                id: true
            }
        })

        if (!planId) {
            return {
                ok: false,
                message: 'El plan no existe'
            };
        }

        await prisma.link.update({
            where: {
                id: urlExists.id
            },
            data: {
                // shortUrl: hash,
                planId: planId.id,
                updatedAt:  new Date( Date.now() )
            }
        });

        revalidatePath('/')
        revalidatePath('/payment')
        revalidatePath(`/payment/${hash}`)
        revalidatePath(`/payment/${hash}?plan=${plan.name}`)

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