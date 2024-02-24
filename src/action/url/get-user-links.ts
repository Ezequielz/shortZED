'use server'
import prisma from '@/lib/prisma';

export const getUserLinks = async( userId: string, isActive?: boolean | 'all' ) => {

    try {

        // await sleep()
        const links = await prisma.link.findMany({
            where: {
                userId: userId ,
                isActive: typeof(isActive) === 'boolean' ? isActive : undefined
            },
            orderBy: {
                createdAt: 'desc'
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


        if(!links) {
            return {
                ok:false,
                message: 'No hay links para el usuario o el usuario no existe'
            }
        }

        return {
            ok: true,
            links: links
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            message: 'No se pudo obtener los links del usuario'
        }
    }


}