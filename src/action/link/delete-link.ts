'use server'

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export const deleteUrl = async (hash: string) => {

    const session = await auth();
    // Verificar session usuario
    if (!session?.user) {
        return {
            ok: false,
            message: 'No hay sessión de usuario'
        };
    };
    try {
        if (session.user.roles !== Role.admin) {

            await prisma.link.delete({
                where: {
                    shortUrl: hash,
                    userId: session?.user?.id
                }
            })
        } else {
            await prisma.link.delete({
                where: {
                    shortUrl: hash
                }
            });

        }
        revalidatePath('/');
        revalidatePath('/links');
        revalidatePath('/admin/links');

        return {
            ok: true,
            message: 'Url eliminada correctamente'
        }
    } catch (error: any) {
        console.log(error)
        return { ok: false, error: error.message ?? 'Error al eliminar url' }
    }
}