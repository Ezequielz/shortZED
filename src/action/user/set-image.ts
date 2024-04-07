'use server'
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { uploadImages } from '../images/upload-images';
import { deleteImage } from '../images/delete-image';
import { revalidatePath } from 'next/cache';


export const setImage = async (formData: FormData) => {

    const session = await auth();
    if (!session) return { ok: false, message: 'Debe estar logeado para cambiar la imagen' }

    const images = formData.getAll('images') as File[]
    if (!images) return { ok: false, message: 'No se encontro la imagen' }


    try {

        const uploadedImages = await uploadImages(images);
       
        if (!uploadedImages) return { ok: false, message: 'No se pudo subir la imagen' }
     
        //  buscar imagen antigua en la BD
        const userImageOld = await prisma.user.findUnique({
            where: {
                id: session.user?.id
            },
            select: {
                image: true
            }
        })
        // eliminar imagenes antiguas en cloudinary 
        if (userImageOld) {
            const cloudImageID = userImageOld?.image?.split('/').pop()?.split('.')[0]
            
            deleteImage(cloudImageID!)
        }
      
        // Actualizar imagen en la BD
        await prisma.user.update({
            where: {
                id: session.user?.id
            },
            data: {
                image: uploadedImages[0]
            }
        })

        revalidatePath('/profile')

        return {
            ok: true,
            message: 'Imagen subida correctamente'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo cargar la imagen'
        }
    }

}