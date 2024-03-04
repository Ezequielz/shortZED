'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

enum Order  {
    asc= 'asc',
    desc= 'desc'
}

interface Props {
    page?: number;
    take?: number;
    order?: Order
    user?: string
}


export const getAllLinks = async ({
    page = 1,
    take = 7,
    order,
    user
}: Props) => {

    const session = await auth();

    if ( session?.user?.roles !== 'admin' ) {
        return {
            ok:false,
            message: 'No tiene los permisos necesarios'
        }
    }

    if (isNaN(page) || isNaN(take)) {
        throw new Error('La página y el tamaño deben ser números')
    }
    if (page < 1) page = 1;
    try {

        const links = await prisma.link.findMany({
            take,
            skip: (page - 1) * take,
            where: {
                userId: user
            },
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

        const totalCount = await prisma.link.count({
            where: {
                userId: user
            }
        })
        const totalPages = Math.ceil( totalCount / take )

        return {
            ok: true,
            currentPage: page,
            totalPages,
            links: links,
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo obtener los links'
        }
    }

} 