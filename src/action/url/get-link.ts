'use server'

import prisma from '@/lib/prisma';

export const getLink = async( slug: string ) => {

    try {

        const link = await prisma.link.findFirst({
            where: {
                shortUrl: slug
            }
        })

        if(!link) {
            return {
                ok:false,
                message: 'No existe el short'
            }
        }

        return {
            ok: true,
            link: link
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            message: 'No se pudo obtener el link'
        }
    }


}