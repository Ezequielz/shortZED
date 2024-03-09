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
    order?: Order;
    user?: string;
    search?: string;
}


export const getAllLinks = async ({
    page = 1,
    take = 7,
    order,
    user,
    search = ''
}: Props) => {
    // await sleep(2)
    const session = await auth();

    if (session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        };
    };

    if (isNaN(page) || isNaN(take)) {
        throw new Error('La página y el tamaño deben ser números');
    };
    if (page < 1) page = 1;
    try {

        const [links, totalLinkCount, totalLinkActive, totalLinkInactive] = await Promise.all([
            prisma.link.findMany({
                where: {
                    OR: [
                        { url: { contains: search } },
                        { shortUrl: { contains: search } },
                    ]
                },
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
            }),
            prisma.link.count({
                where: {
                    OR: [
                        { url: { startsWith: search } },
                        { shortUrl: { startsWith: search } },
                    ]
                },
            }),
            prisma.link.count({
                where: {
                    isActive: true
                }
            }),
            prisma.link.count({
                where: {
                    isActive: false
                }
            }),
        ])



        const totalPages = Math.ceil(totalLinkCount / take);

        return {
            ok: true,
            currentPage: page,
            totalPages,
            totalLinkCount,
            totalLinkActive,
            totalLinkInactive,
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