'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';
import { sleep } from '@/helpers';

export const getOrderByUser = async (userId: string) => {
    // await sleep(3)
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        };
    };

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true
                    }
                },
                code: {
                    select: {
                        name: true,
                        discount: true
                    }
                },
                link: {
                    select: {
                        url: true,
                        shortUrl: true,
                        limit:true

                    }
                },
                plan: {
                    select: {
                        name: true,
                        price: true,
                        limit: true
                    }
                },
            }
        });

        if (!orders) throw `${userId} no existe`;

        return {
            ok: true,
            orders: orders
        };

    } catch (error: any) {
        console.log(error);
        return {
            ok: false,
            message: error.message
        };
    }
}