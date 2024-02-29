'use server'
import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const setTransactionId = async (orderId: string, transactionId: string) => {

    const session = await auth();
    const userId = session?.user?.id;
    // Verificar session usuario
    if (!userId) {
        return {
            ok: false,
            message: 'No hay sessión de usuario'
        }
    }

    try {

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId: transactionId }
        })

        if ( !order ) {
            return {
                ok: false,
                message: `No se encontro la orden con el id ${ orderId }`
            }
        }

        return {
            ok: true,
            message: `Transacción existosa`
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo registrar la transaccion'
        }
    }

}