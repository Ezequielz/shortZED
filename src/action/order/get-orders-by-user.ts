'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';
import { sleep } from '@/helpers';

interface Props {
    page?: number;
    take?: number;
    isPaid?: boolean;
};

export const getOrdersByUser = async ({
    page = 1,
    take = 7,
    isPaid
}: Props) => {
    // await sleep(3)
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        };
    };

    if (isNaN(page) || isNaN(take)) {
        throw new Error('La página y el tamaño deben ser números')
    }
    if (page < 1) page = 1;

    try {

        const [orders, totalCount, ordersPaid, ordersNotPaid, ordersTotal] = await Promise.all([
            prisma.order.findMany({
                take,
                skip: (page - 1) * take,
                where: {
                    userId: session.user.id
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
                            limit: true

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
            }),
            prisma.order.count({
                where: {
                    userId: session?.user?.id,
                    isPaid: isPaid
                }
            }),
            prisma.order.count({
                where: {
                    userId: session?.user?.id,
                    isPaid: true
                }
            }),
            prisma.order.count({
                where: {
                    userId: session?.user?.id,
                    isPaid: false
                }
            }),
            prisma.order.count({
                where: {
                    userId: session?.user?.id,
                }
            })
        ])

        const totalPages = Math.ceil(totalCount / take)


        if (!orders) throw `${session.user.id} no existe`;

        return {
            ok: true,
            currentPage: page,
            totalPages,
            totalCount,
            ordersPaid,
            ordersNotPaid,
            ordersTotal,
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