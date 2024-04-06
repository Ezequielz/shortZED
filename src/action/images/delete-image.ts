'use server'
import { folderImages } from './folder';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const deleteImage = async (imageId: string) => {

    try {
       const response = await cloudinary.uploader.destroy(`${folderImages}/${imageId}`)
       if (response.result === 'ok') {
           return { ok: true, message: 'Imagen eliminada' }
        }
        
    } catch (error) {
        console.log(error)
        return { ok: false, error: 'Error al eliminar la imagen' }
    }

    
}
    