'use server'

import prisma from '@/lib/prisma';

export const getLink = async( slug: string ) => {

    try {

        const link = await prisma.link.findUnique({
            where: {
                shortUrl: slug
            },
            include: {
                
                user: {
                    
                    select: {
                        name: true,
                        email: true,
                        image: true,         
                                
                    }
                }
            },
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
            message: 'No se pudo obtener el link',
        }
    }


}