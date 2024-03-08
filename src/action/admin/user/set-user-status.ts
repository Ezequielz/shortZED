'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export const setUserStatus = async ( id: string, status: boolean ) => {

    const session = await auth()
    if (session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        };
    };

    const userExist = await prisma.user.findFirst({
        where: {
            id
        }
    });

    if (!userExist) {
        return { ok: false, error: 'User not found' }
    }



    try {
      const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            isActive: status
        }
      })

        return {
            ok: true,
            user: user
        }
    } catch (error: any) {
        console.log(error)
        return { ok: false, error: error.message }
    }
}