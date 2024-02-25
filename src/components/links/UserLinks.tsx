
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';

import { StatusLinks } from './StatusLinks';
import { TableLinks } from '..';
import { getUserLinks } from '@/action';





export const UserLinks = async () => {

    const session = await auth();
 

    if (!session?.user?.id) {
        redirect('/');
    };
   

    const { links, ok } = await getUserLinks(session.user.id);

    const row = links?.length ?? 7

    // if (!ok || !links) {
    //     return <div>Loading...</div>;
    // };

    // if (links!.length === 0) {
    //     return (
    //         <div>No tiene ningún acortador creado</div>
    //     );
    // };

    return (
        <>

            <StatusLinks />

            <section className="flex flex-col mt-8">

                <div className="py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="inline-block min-w-full  align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        

                        <TableLinks row={row}/>


                    </div>
                </div>
            </section>
        </>




    )
}

