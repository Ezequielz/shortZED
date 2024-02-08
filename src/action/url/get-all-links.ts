'use server'

import prisma from '@/lib/prisma';


export const getAllLinks = async() => {

    try {

        const links = await prisma.link.findMany()

        return {
            ok: true,
            links: links,
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo obtener los links'
        }
    }

} 