'use server'

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { z } from 'zod';

interface Props {
    name: string;
    discount: number;
};


export const setCode = async ({ name, discount }: Props) => {

    const session = await auth();

    if (session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción'
        };
    };

    const schemaCode = z.object({
        name: z.string().min(3),
        discount: z.number().min(1).max(100)
    }).safeParse({ name, discount });

    if (!schemaCode.success) {
        console.log(schemaCode.error.issues[0].message);
         return {
            ok: false,
            message: 'Los valores no son aceptables'
        };
     };

    try {

   
        const codeExists = await prisma.code.findFirst({
            where: {
                name: name
            }
        });

        if (codeExists) {
            return {
                ok: false,
                message: 'El nombre del código ya existe'
            }
        }

        const code = await prisma.code.create({
            data: {
                name: schemaCode.data.name,
                discount: schemaCode.data.discount,
            }
        });
   
        //Revalidate Path
        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/admin/codes');

        return {
            ok: true,
            message: 'Código creado exitosamente',
            code: code
        };


    } catch (error: any) {
        console.log(error);
        let message = 'No se pudo guardar el código';

        if (error?.code === 'P2002') {
            message = 'El nombre de código ya existe, prueba con otro';
        };

        return {
            ok: false,
            message: message
        };
    }
}