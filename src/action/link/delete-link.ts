'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteUrl = async ( hash: string) => {

    const session = await auth();
      // Verificar session usuario
      if (!session?.user) {
        return {
            ok: false,
            message: 'No hay sessión de usuario'
        };
    };
    try {
        await prisma.link.delete({
            where: {
                shortUrl: hash,
                userId: session?.user?.id
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