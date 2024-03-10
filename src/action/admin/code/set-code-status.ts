'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { z } from 'zod';

export const setCodeStatus = async ( id: string, status: boolean ) => {

    const session = await auth();
    if (session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        };
    };

    const schemaCodeStatus = z.object({
        status: z.boolean()
    }).safeParse({ status});

    if (!schemaCodeStatus.success) {
        console.log(schemaCodeStatus.error.issues[0].message);
         return {
            ok: false,
            message: 'Los valores no son aceptables'
        };
     };

    const codeExist = await prisma.code.findFirst({
        where: {
            id
        }
    });

    if (!codeExist) {
        return { ok: false, error: 'Code not found' }
    }



    try {
      const code = await prisma.code.update({
        where: {
            id: id
        },
        data: {
            isActive: status
        }
      });

        return {
            ok: true,
            code:code
        };
    } catch (error: any) {
        console.log(error);
        return { ok: false, error: error.message };
    };
}