'use server'

import { auth } from "@/auth.config";
import prisma from '@/lib/prisma';
import { PlanName } from "@prisma/client";

interface Order {
    hash: string
    plan: PlanName;
    code?: string;
}

export const placeOrder = async ({ hash, plan, code = '' }: Order) => {

    const session = await auth();
    const userId = session?.user?.id
    // Verificar session usuario
    if (!userId) {
        return {
            ok: false,
            message: 'No hay sessión de usuario'
        }
    }

    const [link, planDB, codeDb] = await Promise.all([
        // Obtener la informacion del link
        prisma.link.findFirst({
            where: {
                shortUrl: hash,
                userId: userId
            }
        }),
        // Obtener el plan
        prisma.plan.findFirst({
            where: {
                name: plan
            }
        }),
        //Obtener el codigo si es que viene
        prisma.code.findFirst({
            where: {
                name: code,
                isActive: true
            }
        }),
    ]);


  

    if (!planDB) throw new Error(`${plan}`)
    if (code && !codeDb) throw new Error(`${code} no existe`)
    // if (link?.orderId) throw new Error('El link ya tiene una orden')
    if (!link) throw new Error('no hay link')


    const prevOrderForLinkWhitoutPaid = await prisma.order.findFirst({
        where: {
            userId: userId,
            linkId: link.id,
            isPaid: false
        }
    });

    if (prevOrderForLinkWhitoutPaid) {
        return {
            ok: false,
            message: 'Ya existe una orden para este link imapaga',
            orderId: prevOrderForLinkWhitoutPaid.id,
        }
    }

    // Los totales de tax, subtotal y total
    const subTotal = planDB.price
    const tax = subTotal * 0.05
    const discount = codeDb?.discount ? subTotal! * (codeDb.discount / 100) : null
    const total = discount ? subTotal! + tax - discount : subTotal! + tax



    try {
        // Crear la transacción de base de datos
        const prismaTx = await prisma.$transaction(async (tx) => {

            //  Crear la orden - Encabezado - Detalles
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                    linkId: link.id,
                    planId: planDB.id,
                    codeId: codeDb?.id,
                }
            })

            return {
                order: order,
            }

        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
            message: 'Orden creada'
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }


}