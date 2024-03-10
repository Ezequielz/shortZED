'use server'

import { addMonthDate } from '@/helpers';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';



export const updateLinkLimit = async (id: string, limitUpdate: number | null) => {
    
    const schemaLinkLimit = z.object({
        id: z.string().uuid(),
        limitUpdate: z.number().or(z.literal(null))
    }).safeParse({ id, limitUpdate });

    if (!schemaLinkLimit.success) {
        console.log(schemaLinkLimit.error.issues[0].message);
        return {
            ok: false,
            message: schemaLinkLimit.error.issues[0].message
        };
    };

    if (!id) {
        return {
            ok: false,
            message: 'Debe introducir un id'
        };
    };

    // Buscar si existe el url en la base de datos
    const urlExists = await prisma.link.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            updatedAt: true,
            expires: true,
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
        let expiresCreate = new Date()
        if (!urlExists.limit) {
            expiresCreate = new Date(urlExists.expires)
        }

        let newExpires = addMonthDate(expiresCreate, 1)

        if (!urlExists.limit) {
            const res = await prisma.link.update({

                where: {
                    id: urlExists.id
                },
                data: {
                    limit: null,
                    updatedAt: new Date(Date.now()),
                    expires: newExpires
                }
            });
            return {
                ok: true,
                message: 'Tiempo extendido'
            };
        };


        const res = await prisma.link.update({
            where: {
                id: urlExists.id
            },
            data: {
                // shortUrl: hash,
                // limit: !planLimit.limit ? null : urlExists.limit + planLimit.limit,
                limit: limitUpdate ? limitUpdate + urlExists.limit : null,
                updatedAt: new Date(Date.now())
            }
        });

        revalidatePath('/');
        revalidatePath('/order');
        revalidatePath(`/order/${id}`);
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