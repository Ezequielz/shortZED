'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';





export const deleteOrder = async ( orderId: string ) => {

    const session = await auth();
    // Verificar session usuario
    if (!session?.user) {
        return {
            ok: false,
            message: 'No hay sessión de usuario'
        };
    };


    try {

        await prisma.order.delete({
            where: {
                id: orderId,
                userId: session.user.id,
            }
        });

        revalidatePath('/')
        revalidatePath('/orders')


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