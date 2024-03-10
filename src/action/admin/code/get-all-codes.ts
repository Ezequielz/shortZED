'use server'

import { auth } from '@/auth.config';
import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

interface Props {
    page?: number;
    take?: number;
    codeName?: string;
}

export const getAllCodes = async ({
    page = 1,
    take = 7,
    codeName = ''
}: Props) => {
    // await sleep(2)
    const session = await auth();

    if (session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tiene los permisos necesarios'
        }
    }

    if (isNaN(page) || isNaN(take)) {
        throw new Error('La página y el tamaño deben ser números');
    }
    if (page < 1) page = 1;
    try {

        const [codes, totalCodesCount, totalCodesActive, totalCodesInactive] = await Promise.all([
            prisma.code.findMany({
                take,
                skip: (page - 1) * take,
                where: {
                    OR: [
                        { name: { contains: codeName } },
                        { discount: { equals: +codeName } },

                    ]
                },
                orderBy: {
                    discount: 'asc'
                }
            }),
            prisma.code.count({
                where: {
                    OR: [
                        { name: { contains: codeName } },
                    ]
                },
            }),
            prisma.code.count({
                where: {
                    isActive: true
                }
            }),
            prisma.code.count({
                where: {
                    isActive: false
                }
            })

        ]);

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