
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { getUserLinks } from '@/action';
import { UserLinksItems } from './UserLinksItems';
import { StatusLinks } from './StatusLinks';

export const UserLinks = async () => {

    const session = await auth();


    if (!session?.user?.id) {
        redirect('/');
    };

    const { links, ok } = await getUserLinks(session.user.id);

    if (!ok || !links) {
        return <div>Loading...</div>;
    };

    if (links!.length === 0) {
        return (
            <div>No tiene ningún acortador creado</div>
        );
    };

    return (
        <>
            
            <StatusLinks links={links} />

            <section className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                       
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Url</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Short Url</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Estado</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Clicks</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Limite</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Copiar Short</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Editar</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Eliminar</th>

                                </tr>
                            </thead>

                            <UserLinksItems />
                        </table>
                        
                    </div>
                </div>
            </section>
        </>




    )
}

