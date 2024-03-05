'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';


interface Props {
    page?: number;
    take?: number;
};


export const getAllUsers = async ({
    page = 1,
    take = 7,
}: Props) => {

    const session = await auth();

    if (session?.user?.roles !== 'admin') {
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

        const users = await prisma.user.findMany({
            take,
            skip: (page - 1) * take,
            include: {
                Link: true,
                Order: true
            }
        });

        const adminsRoleCount = await prisma.user.count({
            where: {
                roles: 'admin'
            }
        });
        const usersRoleCount = await prisma.user.count({
            where: {
                roles: 'user'
            }
        });
        const usersActive = await prisma.user.count({
            where: {
                isActive: true,
            }
        });
        const usersInactive = await prisma.user.count({
            where: {
                isActive: false
            }
        });

        const totalCount = await prisma.user.count();

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