'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';
import { Role } from '@prisma/client';
import { sleep } from '@/helpers';

export const getOrderById = async (id: string) => {
    // await sleep(2);
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        };
    };

    try {
        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                code: true,
                link: true,
                plan: true,
            }
        });

        if (!order) throw `${id} no existe`;


        if (session.user.roles !== Role.admin && session.user.id !== order.userId) {
            throw `orden: ${id}, no es de ese usuario`;
        };



        return {
            ok: true,
            order: order
        };

    } catch (error: any) {
        console.log(error);
        return {
            ok: false,
            message: 'Orden no existe'
        };
    }
}