'use server'

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { z } from 'zod';



interface Data {
    url?: string;
    shortUrl?: string;
    isActive?: boolean;
    limit?: number | null;
    expires?: Date;
};


export const updateLinkByAdmin = async (updateLink: Data, short: string) => {

    const session = await auth();

    if (!session || session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción'
        };
    };

    try {
         //  verificar que la url es válida
         if (updateLink.url && !updateLink.url.startsWith('http://') && !updateLink.url.startsWith('https://')) {

         return {
             ok: false,
             message: 'La url no es válida'
         };
     };

    
        const schemaLink = z.object({
            url: z.string().min(50).url().optional(),
            shortUrl: z.string().min(3).optional(),
            isActive: z.boolean().optional(),
            limit: z.number().nullable().optional(),
            expires: z.date().optional(),
        }).safeParse({ updateLink });

        if (!schemaLink.success) {
            return {
                ok: false,
                message: 'Los valores no son aceptables'
            };
        };

        // Buscar si existe el url en la base de datos
        const urlExists = await prisma.link.findFirst({
            where: {
                shortUrl: short,
            }
        });

        if (!urlExists) {
            return {
                ok: false,
                message: 'El url no existe'
            };
        };

       

        await prisma.link.update({
            where: {
                shortUrl: short,

            },
            data: {
                ...updateLink,
            }
        });

        revalidatePath('/');
        revalidatePath('/links');
        revalidatePath(`/admin/links`);
        revalidatePath(`/admin/links?short=${short}`);

        return {
            ok: true,
            message: 'Url actualizado',
        };

    } catch (error: any) {
        console.log(error);
        let message = 'No se pudo actualizar el url ';

        if (error?.code === 'P2002') {
            message = 'El hash ya existe, prueba con otro'
        };

        return {
            ok: false,
            message: message
        };
    }
}