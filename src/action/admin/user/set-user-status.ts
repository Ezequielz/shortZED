'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { z } from 'zod';

export const setUserStatus = async ( id: string, status: boolean ) => {

    const session = await auth()
    if (session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        };
    };

    const schemaUserStatus = z.object({
        status: z.boolean()
    }).safeParse({ status});

    if (!schemaUserStatus.success) {
        console.log(schemaUserStatus.error.issues[0].message);
         return {
            ok: false,
            message: 'Los valores no son aceptables'
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