
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
        },
        {
            name: 'Bayron',
            email: 'bay@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
    ]
}