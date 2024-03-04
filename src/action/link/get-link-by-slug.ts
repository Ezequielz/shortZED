'use server'

import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';

export const getLinkBySlug = async( slug: string, userId?: string ) => {
    // await sleep(2)
    try {

        if (!slug) throw new Error('No hay slug');

        const link = await prisma.link.findUnique({
            where: {
                shortUrl: slug,
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
                message: 'No existe el short'
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


