import prisma from '../lib/prisma';
import { initialData } from './seed';



async function main() {

    await prisma.link.deleteMany();
    await prisma.user.deleteMany();

    const {  users, links } = initialData;

    await prisma.user.createMany({
        data: users
    });
    await prisma.link.createMany({
        data: links
    });

    console.log('Seed Ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();