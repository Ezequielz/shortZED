'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export const setUrl = async (url: string, userId?: string) => {

    try {
    
        // Buscar si existe el url en la base de datos
        const urlExists = await prisma.link.findFirst({
            where: {
                url: url
            },
            include: {
                user: {
                    select: {
                        shortener: true
                    }
                }
            }
        });
     

        // si viene userId y existe el url, agreagar el usuario al url
        if (userId && urlExists) {
            await prisma.link.update({
                where: {
                    id: urlExists.id
                },
                data: {
                    userId: userId,
                    shortUrl: `${urlExists.user?.shortener}.${urlExists.shortUrl}` ,
                }
            });

            return {
                ok: true,
                shortUrl: urlExists.shortUrl,
                message: 'Url actualizado con el shortcut de tu usuario'
            }
        };

        // si no viene userId y existe el url, devolver el url
        if (!userId && urlExists) {
            return {
                ok: true,
                url: urlExists.url,
                message: 'Url existente',
            }
        }

        // si no existe la url en base de datos, verificar que la url es válida
        if ( !url.startsWith('http://') && !url.startsWith('https://') ) {
            return {
                ok: false,
                message: 'La url no es válida'
            }
        } 

        // si no existe el url, crear el url y agregar el usuario si viene userId
        const shortUrl = Math.random().toString(36).substring(2, 5);

        const userShortener = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                shortener: true
            }
        })
    
        if (userShortener) {
          
            await prisma.link.create({
                data: {
                    url: url,
                    shortUrl: `${userShortener?.shortener}.${shortUrl}`,
                    userId: userId
                }
            })
        } else {
           
            await prisma.link.create({
                data: {
                    url: url,
                    shortUrl: shortUrl
                }
            })
        }

        //Revalidate Path

        revalidatePath('/')

        return {
            ok: true,
            message: 'Url creado exitosamente',
            url: url,
            shortUrl: shortUrl,
        }
   

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo guardar el url'
        }
    }
}