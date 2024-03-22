'use server'

import prisma from '@/lib/prisma';



export const updateLinkClicks = async (hash: string) => {

    // Buscar si existe el url en la base de datos
    const urlExists = await prisma.link.findFirst({
        where: {
            shortUrl: hash,
        }
    });

    if (!urlExists) {
        return {
            ok: false,
            message: 'El url no existe'
        }
    }

    if (urlExists.limit && urlExists.limit <= urlExists.clicks) {
        
        return {
            ok: false,
            message: 'No puedes actualizar mas clicks'
        }
    }

    try {
        if (!urlExists.limit) {
            return {
                ok: false,
                message: 'No puedes actualizar mas clicks'
            }
        }

        await prisma.link.update({
            where: {
                id: urlExists.id
            },
            data: {
                clicks: urlExists.clicks + 1,
                isActive: urlExists.clicks + 1 >= urlExists.limit ? false : true,
            }
        })

        return {
            ok: true,
            message: 'clicks actualizado',
            clicks: urlExists.clicks + 1,
        }

    } catch (error: any) {

        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }




}