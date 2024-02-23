
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';

import { StatusLinks } from './StatusLinks';
import { ModalLink, TableLinks } from '..';


interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}


export const UserLinks = async ({ searchParams }: Props) => {

    const session = await auth();
    const short = searchParams?.short as string;

    if (!session?.user?.id) {
        redirect('/');
    };
    console.log(searchParams)

    // const { links, ok } = await getUserLinks(session.user.id);

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

                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <ModalLink short={short} />

                        <TableLinks />


                    </div>
                </div>
            </section>
        </>




    )
}

