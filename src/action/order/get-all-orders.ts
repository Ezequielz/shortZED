'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

enum Order {
    asc = 'asc',
    desc = 'desc'
}

interface Props {
    page?: number;
    take?: number;
    order?: Order
    user?: string
}


export const getAllOrders = async ({
    page = 1,
    take = 7,
    order,
    user
}: Props) => {

    const session = await auth();

    if (session?.user?.roles !== 'admin') {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        }
    }

    if (isNaN(page) || isNaN(take)) {
        throw new Error('La página y el tamaño deben ser números')
    }
    if (page < 1) page = 1;
    try {

        const orders = await prisma.order.findMany({
            take,
            skip: (page - 1) * take,
            orderBy: {
                createdAt: order
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,

                    }
                }

            }
        })

        const totalOrderCount = await prisma.order.count()
        const totalOrdersPaid = await prisma.order.count({
            where: {
                isPaid: true
            }
        })
        const totalOrdersNotPaid = await prisma.order.count({
            where: {
                isPaid: false
            }
        })
        const totalPages = Math.ceil(totalOrderCount / take)

        return {
            ok: true,
            currentPage: page,
            totalPages,
            totalOrderCount,
            totalOrdersPaid,
            totalOrdersNotPaid,
            orders: orders
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo obtener los links'
        }
    }

} 