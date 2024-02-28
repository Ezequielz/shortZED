'use server';

import prisma from '@/lib/prisma';


export const getCodeById = async ( id: string ) => {

    try {
       const codeDB = await prisma.code.findFirst({
            where: {
                id: id
            }
        });

        if(!codeDB) return { ok: false, message: 'No se encontro codigo' };

        

        return {
            ok: true,
            code: codeDB,
            message: 'codigo correcto'
        };
    } catch (error: any) {
        console.log(error);
        return { ok: false, message: error.message ?? 'No se encontro codigo' };
    }
}