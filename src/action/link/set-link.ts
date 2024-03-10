'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import QRCode from 'qrcode';
import { z } from 'zod';


export const setLink = async (url: string, hash?: string) => {
    const session = await auth();
    const userId = session?.user?.id
    try {

        const schemaLink = z.object({
            url: z
                .string()
                .url(),
            hash: z
                .string()
                .min(3)
                .max(10)
                .regex(/^[a-zA-Z0-9]+$/g, { message: 'El hash solo puede contener letras y numeros' })
                .or(z.literal(''))
        }).safeParse({ url, hash });

        if (!schemaLink.success) {
            console.log(schemaLink.error.issues[0].message);
            return {
                ok: false,
                message: schemaLink.error.issues[0].message
            };
        };


        // Buscar si existe el url en la base de datos
        const urlExists = await prisma.link.findFirst({
            where: {
                url: url,
                userId: null
            }
        });

        // Buscar si existe el url en la base de datos con el usuario
        const urlExistsWhitUser = await prisma.link.findFirst({
            where: {
                url: url,
                userId: userId
            },
            include: {
                user: true
            }
        });

        // si el url existe y viene el usuario, devolver el url
        if (urlExistsWhitUser && userId) {
            return {
                ok: false,
                message: 'El url ya se encuentra guardado',
                url: urlExistsWhitUser.url,
                shortUrl: urlExistsWhitUser.shortUrl,
            }
        }

        // generar el hash para el url si no viene hash 
        const shortUrl = hash ? hash : Math.random().toString(36).substring(2, 5);

        // si no viene userId y existe el url, devolver el url cambiando el short
        if (!userId && urlExists) {

            await prisma.link.update({
                where: {
                    id: urlExists.id,

                },
                data: {
                    shortUrl: shortUrl,
                }
            });
            return {
                ok: true,
                url: urlExists.url,
                shortUrl: shortUrl,
                message: 'El url ya se encuentra guardado',
            }
        }


        // si viene userId y existe el url, agreagar el usuario al url si no existe el usuario
        if (userId && urlExists) {

            await prisma.link.update({
                where: {
                    id: urlExists.id
                },
                data: {
                    userId: userId,
                    shortUrl: shortUrl,
                }
            });

            return {
                ok: true,
                url: urlExists.url,
                shortUrl: shortUrl,
                message: 'Url actualizado con el usuario'
            }
        };



        //  verificar que la url es válida
        if (!url.startsWith('http://') && !url.startsWith('https://')) {

            return {
                ok: false,
                message: 'La url no es válida'
            }
        }



        // si no existe el url, crear el url y agregar el usuario si viene userId
        if (!urlExists) {

            const qr = await QRCode.toDataURL(process.env.NEXT_PUBLIC_URL_DEV + shortUrl);

            // const freePlan = await prisma.plan.findFirst({
            //     where: {
            //         name: 'free'
            //     }
            // }) 

            // if (!freePlan) {
            //     throw new Error('No se encontró el plan free')
            // }

            if (userId) {
                await prisma.link.create({
                    data: {
                        url: url,
                        shortUrl: shortUrl,
                        userId: userId,
                        // planId: freePlan.id,
                        qr
                    }
                });
                revalidatePath('/')
            } else {

                await prisma.link.create({
                    data: {
                        url: url,
                        shortUrl: shortUrl,
                        // planId: freePlan.id,
                        qr
                    }
                });

            }
        }

        //Revalidate Path

        revalidatePath('/')
        revalidatePath('/links')
        revalidatePath(`/links${shortUrl}`)

        return {
            ok: true,
            message: 'Url creado exitosamente',
            url: url,
            shortUrl: shortUrl,
        }


    } catch (error: any) {
        console.log(error)
        let message = 'No se pudo guardar el url, '

        if (error?.code === 'P2002') {
            message = 'El hash ya existe, prueba con otro'
        }

        return {
            ok: false,
            message: message
        }
    }
}