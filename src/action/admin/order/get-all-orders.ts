'use server'

import { auth } from '@/auth.config';
import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

enum Order {
    asc = 'asc',
    desc = 'desc'
}

interface Props {
    page?: number;
    take?: number;
    search?: string;
}


export const getAllOrders = async ({
    page = 1,
    take = 7,
    search = '',

}: Props) => {
// await sleep(5);
    const session = await auth();

    if (session?.user?.roles !== Role.admin) {
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

        const [orders, ordersCount, ordersPaid, ordersNotPaid] = await Promise.all([
            prisma.order.findMany({
                take,
                skip: (page - 1) * take,
                where: {
                    OR: [
                        { id: { contains: search } },
                        { user: { name: { contains: search } } }, 
                    ]
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,

                        }
                    },
                    plan: true,
                    code: true,
                    link: true,

                }
            }),
            prisma.order.count({
                where: {
                    OR: [
                        { id : { startsWith: search } },
                        { user: { name: { contains: search } } }, 
                    ]
                    
                }
                
            }),
            prisma.order.count({
                where: {
                    isPaid: true
                }
            }),
            prisma.order.count({
                where: {
                    isPaid: false
                }
            })

        ]);

        const totalPages = Math.ceil(ordersCount / take)
       
        return {
            ok: true,
            currentPage: page,
            totalPages,
            ordersCount,
            ordersPaid,
            ordersNotPaid,
            orders: orders
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo obtener las ordenes'
        }
    }

} 