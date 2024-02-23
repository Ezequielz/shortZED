'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export const updateUrl = async (url: string, hash?: string, userId?: string) => {

    return {
        url: url,
        hash: hash,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        ok: true,
        message: '',
        shortUrl: ''
    }
}