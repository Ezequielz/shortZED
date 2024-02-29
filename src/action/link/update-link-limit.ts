'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';



export const updateLinkLimit = async (id: string, limitUpdate: number | null) => {
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

        if (!urlExists.limit) {
            return {
                ok: false,
                message: 'Tienes el plan super, con clicks ilimitados'
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