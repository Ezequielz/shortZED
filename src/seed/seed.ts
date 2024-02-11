
import bcryptjs from 'bcryptjs'

export interface SeedLink {
    url: string;
    shortUrl: string;
    clicks: number;
    user?: string;
    userId?: string;
}

export interface SeedUser {
    name: string;
    email: string;
    emailVerified?: boolean;
    password: string;
    image?: string;
    shortener?: string
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
            emailVerified: true,
            password: bcryptjs.hashSync('123456'),
            shortener: 'qpw'
        },
        {
            name: 'Usuario Prueba',
            email: 'user@gmail.com',
            emailVerified: true,
            password: bcryptjs.hashSync('123456'),
            shortener: 'qwe'
        },
        {
            name: 'Bayron',
            email: 'bay@gmail.com',
            password: bcryptjs.hashSync('123456'),
            shortener: 'wpo'
        },
        {
            name: 'Kathy',
            email: 'kat@gmail.com',
            password: bcryptjs.hashSync('123456')
        },
    ]
}