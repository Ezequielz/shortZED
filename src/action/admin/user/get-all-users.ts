'use server'

import { auth } from '@/auth.config';
import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';


interface Props {
    page?: number;
    take?: number;
    search?: string;
};


export const getAllUsers = async ({
    page = 1,
    take = 7,
    search = ''
}: Props) => {
    // await sleep(8);

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

        const [users, adminsRoleCount, usersRoleCount, usersActive, usersInactive, totalCount] = await Promise.all([
            prisma.user.findMany({
                where: {
                    OR: [
                        { email: { startsWith: search } },
                        { name: { startsWith: search } },
                    ]
                },
                take,
                skip: (page - 1) * take,
                include: {
                    Link: true,
                    Order: true
                }
            }),
            prisma.user.count({
                where: {
                    roles: Role.admin
                }
            }),
            prisma.user.count({
                where: {
                    roles: Role.user
                }
            }),
            prisma.user.count({
                where: {
                    isActive: true,
                }
            }),
            prisma.user.count({
                where: {
                    isActive: false
                }
            }),
            prisma.user.count({
                where: {
                    OR: [
                        { email: { startsWith: search } },
                        { name: { startsWith: search } },
                    ]
                },
            })

        ]);

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPage: page,
            totalPages,
            totalCount,
            adminsRoleCount,
            usersRoleCount,
            usersActive,
            usersInactive,
            users: users
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo obtener los usuarios'
        };
    };

} 