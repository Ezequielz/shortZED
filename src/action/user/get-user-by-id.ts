'use server'

import prisma from '@/lib/prisma';

export const getUserById = async ( id: string ) => {

    try {
       const user = await prisma.user.findFirst({
            where: {
                id: id
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