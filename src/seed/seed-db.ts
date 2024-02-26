import prisma from '../lib/prisma';
import { initialData } from './seed';



async function main() {

    await prisma.link.deleteMany();
    await prisma.plan.deleteMany();
    await prisma.user.deleteMany();

    const { users, links, plans } = initialData;

    await prisma.user.createMany({
        data: users
    });
    await prisma.plan.createMany({
        data: plans
    });

    const freePlan = await prisma.plan.findFirst({
        where: {
            name: 'free'
        }
    });

    links.forEach(async (link) => {
       
        await prisma.link.create({
            data: {
                ...link,
                user: undefined,
                planId: freePlan!.id!,

            }
        });

    })



    console.log('Seed Ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();