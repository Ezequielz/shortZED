'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export const setUrl = async (url: string, hash?:string, userId?: string) => {

    try {
       
        // Buscar si existe el url en la base de datos
        const urlExists = await prisma.link.findFirst({
            where: {
                url: url
            },
            include: {
                user: true
            }
        });


        // si no viene userId y existe el url, devolver el url
        if (!userId && urlExists) {
           console.log('first')
            return {
                ok: false,
                url: urlExists.shortUrl,
                message: 'El url ya se encuentra guardado',
            }
        }

        // si viene userId y existe el url, agreagar el usuario al url si no existe el usuario
        if (userId && urlExists && !urlExists.userId) {
            await prisma.link.update({
                where: {
                    id: urlExists.id
                },
                data: {
                    userId: userId,
                }
            });
            
            return {
                ok: false,
                shortUrl: urlExists.shortUrl,
                message: 'Url actualizado con el usuario'
            }
        };

        // si el usuario ya tiene un link guardado, devolver el link y un mensaje de error
        if (userId && urlExists && urlExists.userId) {
            return {
                ok: false,
                message: 'Ya tienes ese url guardado',
                url: urlExists.url,
                shortUrl: urlExists.shortUrl,
            }
        }

        // si no existe la url en base de datos, verificar que la url es válida
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          
            return {
                ok: false,
                message: 'La url no es válida'
            }
        }

        const shortUrl = hash ? hash : Math.random().toString(36).substring(2, 5);

        // si no existe el url, crear el url y agregar el usuario si viene userId
        if (!urlExists) {   
        
            if ( userId ){
                await prisma.link.create({
                    data: {
                        url: url,
                        shortUrl: shortUrl,
                        userId: userId
                    }
                });
                revalidatePath('/')
            } else {
             
                await prisma.link.create({
                    data: {
                        url: url,
                        shortUrl: shortUrl,
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


    } catch (error: any  ) {
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