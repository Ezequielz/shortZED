'use server'
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export const registerUser = async( name:string, email:string, password:string, image?: string | null) => {
    console.log('sdfg')

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync( password ),
                image: image,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            }
        });

        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/admin/users');

        return {
            ok: true,
            user: user,
            message: 'Usuario creado correctamente'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }
}