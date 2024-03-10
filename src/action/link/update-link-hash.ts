'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { z } from 'zod';


export const updateLinkHash = async (url: string, hash: string) => {
    const session = await auth();
    const userId = session?.user?.id;
  
    // await sleep(2);
    const schemaLinkHash = z.object({
        url: z.string().url({ message: 'Debe ser un url válido' }),
        hash: z.string().min(3).max(10).regex(/^[a-zA-Z0-9]+$/g, { message: 'El hash solo puede contener letras y numeros' })
    }).safeParse({ url, hash });

    if (!schemaLinkHash.success) {
        console.log(schemaLinkHash.error.issues[0].message);
        return {
            ok: false,
            message: schemaLinkHash.error.issues[0].message
        };
    };

    if (!hash) {
        return {
            ok: false,
            message: 'Debe introducir un hash'
        };
    };

    hash?.trim();

    if (hash && hash.length < 3) {
        return {
            ok: false,
            message: 'El hash no puede tener menos de 3 caracteres'
        };
    };

    if (hash && hash.length > 10) {
        return {
            ok: false,
            message: 'El hash no puede tener mas de 10 caracteres'
        };
    };

    // Buscar si existe el url en la base de datos
    const urlExists = await prisma.link.findFirst({
        where: {
            url: url,
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

        await prisma.link.update({
            where: {
                id: urlExists.id
            },
            data: {
                shortUrl: hash,
                // updatedAt:  new Date( Date.now() )
            }
        });

        // revalidatePath('/')
        // revalidatePath('/links')
        // revalidatePath(`/links${hash}`)

        return {
            url: url,
            ok: true,
            message: 'hash actualizado',
            shortUrl: hash
        };

    } catch (error: any) {

        console.log(error);
        return {
            ok: false,
            message: error.code === 'P2002' ? 'El hash ya existe, prueba con otro' : 'Error al actualizar el hash'
        };
    }




}