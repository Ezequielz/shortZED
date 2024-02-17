
import bcryptjs from 'bcryptjs'

export interface SeedLink {
    url: string;
    shortUrl: string;
    clicks: number;
    user?: string;
    userId?: string;
}
type Role = 'user' | 'admin';

export interface SeedUser {
    name: string;
    email: string;
    emailVerified?: Date;
    roles?: Role;
    password: string;
    image?: string;
}


interface SeedData {
    links: SeedLink[];
    users: SeedUser[];
}



export const initialData: SeedData = {
    links: [
        {
            url: 'https://github.com/Ezequielz',
            shortUrl: 'sd2rf',
            clicks: 0,
        }
    ],
    users: [
        {
            name: 'Ezequiel',
            email: 'eze@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Usuario Prueba',
            email: 'user@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Bayron',
            email: 'bay@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Kathy',
            email: 'kat@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
    ]
}