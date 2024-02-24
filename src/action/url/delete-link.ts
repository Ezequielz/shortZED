'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteUrl = async (url: string, hash?: string, userId?: string) => {

}