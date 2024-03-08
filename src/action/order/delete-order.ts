'use server'

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export const deleteOrder = async (orderId: string) => {

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
                    id: orderId,
                    userId: session?.user?.id
                }
            })
        } else {
            await prisma.order.delete({
                where: {
                    id: orderId,
                }
            });
        };

        revalidatePath('/');
        revalidatePath('/orders');
        revalidatePath('/admin/orders');


        return {
            ok: true,
            message: 'Orden eliminada'
        };
    } catch (error: any) {
        console.log({ error });
        return {
            ok: false,
            message: error?.message
        };
    }


}