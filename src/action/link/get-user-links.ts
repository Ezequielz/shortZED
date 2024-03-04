'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';


interface Props {
    page?: number;
    take?: number;
    isActive?: boolean ;
};


export const getUserLinks = async ({
    page = 1,
    take = 7,
    isActive
}: Props) => {

    const session = await auth();

    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        }
    };
    if (isNaN(page) || isNaN(take)) {
        throw new Error('La página y el tamaño deben ser números')
    }
    if (page < 1) page = 1;
    try {

        const [links, totalCount, linksActive, linksInactive, linksTotal] = await Promise.all([
            prisma.link.findMany({
                take,
                skip: (page - 1) * take,
                where: {
                    userId: session?.user?.id,
                    isActive: isActive

                },
                orderBy: {
                    createdAt: 'desc'
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
                    userId: session?.user?.id,
                    isActive: isActive
                }
            }),
            prisma.link.count({
                where: {
                    userId: session?.user?.id,
                    isActive: true
                }
            }),
            prisma.link.count({
                where: {
                    userId: session?.user?.id,
                    isActive: false
                }
            }),
            prisma.link.count({
                where: {
                    userId: session?.user?.id,
                }
            })
        ])


        const totalPages = Math.ceil(totalCount / take)

        return {
            ok: true,
            currentPage: page,
            totalPages,
            totalCount,
            linksActive,
            linksInactive,
            linksTotal,
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