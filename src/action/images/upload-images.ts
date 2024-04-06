'use server'
import { v2 as cloudinary } from 'cloudinary';
import { folderImages } from './folder';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const uploadImages = async (images: File[]) => {
    
    if (!images) {
        return null;
    }
    const uploadPromises = images.map(async (image) => {

        try {
            const buffer = await image.arrayBuffer();
            const base64Image = Buffer.from(buffer).toString('base64');
            // subir imagen a cloudinary                                                // carpeta
            return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: folderImages, name: 'asdsad' })
                .then(r => r.secure_url);
        } catch (error) {
            console.log(error);
            return null;
        }

    })

    return await Promise.all(uploadPromises);
}