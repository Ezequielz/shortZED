'use server'

import prisma from '@/lib/prisma';

export const getLinkById = async( id: string ) => {
    
    try {

        if (!id) throw new Error('No hay id');

        const link = await prisma.link.findUnique({
            where: {
                id: id
                // userId: userId ? userId : null
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
        });

        

        if(!link) {
            // console.log(link)
            return {
                ok:false,
                message: 'No existe el link'
            }
        };

        // console.log(link)
        return {
            
            ok: true,
            links: [link]
        };
        
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            message: 'No se pudo obtener el link',
        }
    };


};


