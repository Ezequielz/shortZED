'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



interface Props {
    orderId: string;
};

export const deleteOrder = async ({ orderId }: Props) => {

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