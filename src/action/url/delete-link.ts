'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteUrl = async ( hash: string, userId: string) => {

    try {
        await prisma.link.delete({
            where: {
                shortUrl: hash,
                userId: userId
            }
        })
        revalidatePath('/')
        revalidatePath('/links')

        return {
            ok: true,
            message: 'Url eliminada correctamente'
        }
    } catch (error: any) {
        console.log(error)
        return { ok: false, error: error.message ?? 'Error al eliminar url' }
    }
}