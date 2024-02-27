'use server';

import prisma from '@/lib/prisma';


export const getCode = async ( code: string ) => {

    try {
       const codeDB = await prisma.code.findFirst({
            where: {
                name: code
            }
        });

        if(!codeDB) return { ok: false, message: 'No se encontro codigo' };

        const {id, ...rest } = codeDB;

        return {
            ok: true,
            code: rest,
            message: 'codigo correcto'
        };
    } catch (error: any) {
        console.log(error);
        return { ok: false, message: error.message ?? 'No se encontro codigo' };
    }
}