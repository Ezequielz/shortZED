'use server';

import prisma from '@/lib/prisma';


export const getCode = async ( name: string ) => {

    try {
       const codeDB = await prisma.code.findFirst({
            where: {
                name: name
            }
        });

        if(!codeDB) return { ok: false, message: 'No se encontro código' };

        if (!codeDB.isActive) return { ok: false, message: 'Código inactivo' };

        const {id, ...rest } = codeDB;

        return {
            ok: true,
            code: rest,
            message: 'Código correcto'
        };
    } catch (error: any) {
        console.log(error);
        return { ok: false, message: error.message ?? 'No se encontro código' };
    }
}