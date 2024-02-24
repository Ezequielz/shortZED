'use server'

import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';



export const updateUrl = async (url: string, userId: string, hash: string) => {

    // await sleep(2)
    if (!hash) {
        return {
            ok: false,
            message: 'Debe introducir un hash'
        }
    }

    hash?.trim()

    if (hash && hash.length < 3) {
        return {
            ok: false,
            message: 'El hash no puede tener menos de 3 caracteres'
        }
    }

    if (hash && hash.length > 10) {
        return {
            ok: false,
            message: 'El hash no puede tener mas de 10 caracteres'
        }
    }

    // Buscar si existe el url en la base de datos
    const urlExists = await prisma.link.findFirst({
        where: {
            url: url,
            userId: userId
        }
    });
    console.log(urlExists)

    if (!urlExists) {
        return {
            ok: false,
            message: 'El url no existe'
        }
    }

    try {

        await prisma.link.update({
            where: {
                id: urlExists.id
            },
            data: {
                shortUrl: hash
            }
        })

        // revalidatePath('/')
        // revalidatePath('/links')
        // revalidatePath(`/links${hash}`)

        return {
            url: url,
            ok: true,
            message: 'hash actualizado',
            shortUrl: hash
        }

    } catch (error: any) {

        console.log(error)
        return {
            ok: false,
            message: error.code === 'P2002' ? 'El hash ya existe, prueba con otro' : 'Error al actualizar el hash'
        }
    }




}