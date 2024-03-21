'use server'

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { PaypalOrderStatusResponse } from '@/interfaces';
import { auth } from '@/auth.config';
import { Role } from '@prisma/client';


export const paypalCheckPayment = async (paypalTransactionId: string) => {

    const authToken = await getPaypalBearerToken();

    if (!authToken) {
        return {
            ok: false,
            message: 'No se pudo obtener token de verificación'
        };
    };


    const resp = await verifyPaypalPayment(paypalTransactionId, authToken);
    if (!resp) {
        return {
            ok: false,
            message: 'Error al verificar el pago'
        };
    };


    const { status, purchase_units } = resp;

    const { invoice_id: orderId } = purchase_units[0]
    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'El pago no se completó en Paypal'
        };
    };

    // realizar la actualizacion en nuestra base de datos
    try {
        // console.log({ status, purchase_units });

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        });

        // revalidar un path
        revalidatePath(`/orders/$${orderId}`)


        return {
            ok: true
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'El pago no se realizo - 500'
        }
    }
};

export const paypalPayment = async (orderId: string) => {

    const session = await auth();
    if (session?.user?.roles !== Role.admin) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción'
        }
    }

    const orderExist = await prisma.order.findFirst({
        where: {
            OR: [
                {
                    id: orderId,
                },
                {
                    id: {
                        endsWith: orderId,
                    },
                },
            ],
        },

        select: {
            id: true,
            transactionId: true,
            total: true,
            link: {
                select: {
                    url: true
                }
            },
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            plan: {
                select: {
                    name: true
                }
            }

        }
    });


    if (!orderExist) {
        return {
            ok: false,
            message: 'No existe la orden'
        }
    };

    if (!orderExist.transactionId) {
        return {
            ok: false,
            message: 'No hay transacciones efectuadas de esta orden'
        }
    }

    const authToken = await getPaypalBearerToken();

    if (!authToken) {
        return {
            ok: false,
            message: 'No se pudo obtener token de verificación'
        };
    };


    const resp = await verifyPaypalPayment(orderExist.transactionId, authToken);
    if (!resp) {
        return {
            ok: false,
            message: 'Error al verificar el pago'
        };
    };
 
    return {
        ok: true,
        resp,
        orderExist
    };
}



const getPaypalBearerToken = async (): Promise<string | null> => {

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        'utf-8'
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(oauth2Url, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json());
        return result.access_token

    } catch (error) {
        console.log(error)
        return null
    }


};

const verifyPaypalPayment = async (
    paypalTransactionId: string,
    bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {

    const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

    const myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${bearerToken}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    try {

        const resp = await fetch(paypalOrderUrl, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json());
        return resp;

    } catch (error) {
        console.log(error)
        return null
    }


}