'use server'
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadImage = async (formData: FormData) => {

    const session = await auth();
    if (!session) return { ok: false, message: 'Debe estar logeado para cambiar la imagen' }

    const images = formData.getAll('images') as File[]
    if (!images) return { ok: false, message: 'No se encontro la imagen' }


    try {


        const uploadPromises = images.map(async (image) => {

            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
                // subir imagen a cloudinary                                                // carpeta
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'short-zed', name: 'asdsad' })
                    .then(r => r.secure_url);
            } catch (error) {
                console.log(error);
                return null;
            }

        })

        const uploadedImages = await Promise.all(uploadPromises);

     
        // eliminar imagenes antiguas en cloudinary
        const userImageOld = await prisma.user.findUnique({
            where: {
                id: session.user?.id
            },
            select: {
                image: true
            }
        })

        if (userImageOld) {
            const cloudImageID = userImageOld?.image?.split('/').pop()?.split('.')[0]
            
            cloudinary.uploader.destroy(`short-zed/${cloudImageID}`)
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