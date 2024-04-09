'use server'

import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';

export const getUserById = async ( id: string ) => {
// await sleep(3)
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