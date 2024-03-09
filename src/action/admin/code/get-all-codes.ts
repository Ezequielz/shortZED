'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

enum Order {
    asc = 'asc',
    desc = 'desc'
}

interface Props {
    page?: number;
    take?: number;
    order?: Order
    user?: string
}


export const getAllCodes = async ({
    page = 1,
    take = 7,
    order,
    user
}: Props) => {

    const session = await auth();

    if (session?.user?.roles !== 'admin') {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        }
    }

    if (isNaN(page) || isNaN(take)) {
        throw new Error('La página y el tamaño deben ser números')
    }
    if (page < 1) page = 1;
    try {

        const codes = await prisma.code.findMany({
            take,
            skip: (page - 1) * take,
        })

        const totalCodesCount = await prisma.code.count()
        const totalCodesActive = await prisma.code.count({
            where: {
                isActive: true
            }
        })
        const totalCodesInactive = await prisma.code.count({
            where: {
                isActive: false
            }
        })
        const totalPages = Math.ceil(totalCodesCount / take)

        return {
            ok: true,
            currentPage: page,
            totalPages,
            totalCodesCount,
            totalCodesActive,
            totalCodesInactive,
            codes: codes
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo obtener los links'
        }
    }

} 