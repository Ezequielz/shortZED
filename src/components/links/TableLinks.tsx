
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { getUserLinks } from '@/action';
import { ModalLink, Pagination, StatusBoxs } from '..'
import { LinksItems } from './LinksItems'

interface Props {
    row?: number;
    short: string;
    page?: number;
    status?: string | undefined;
}

export const TableLinks = async ({ row, short, page, status }: Props) => {
    const session = await auth();
    const isActive = status ? (status === 'true' ? true : false) : undefined;

    if (!session?.user?.id) {
        redirect('/');
    };

    const { links, totalPages, currentPage, linksActive, linksInactive, linksTotal } = await getUserLinks({page, isActive});

    if ( links && links.length === 0) {
       return <div>No posee links guardados</div>
    }
   
    if (!links) {
        notFound();
    }

    if (links.length === 0) {
        redirect(`/?page=1`)
    }

    return (
        <>
            <ModalLink short={short} />
            <div className="py-4">
                <StatusBoxs boxsTitle={['Activo', 'Inactivo', 'Total']} quantity={[linksActive, linksInactive, linksTotal]} />
            </div>
            <div className='lg:min-h-[400px]'>
                <table className="min-w-full ">
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
                                Short</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                QR</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Editar</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Eliminar</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white">


                        <LinksItems links={links} />
                    </tbody>
                </table>
                
            </div>
            <Pagination totalPages={totalPages} />
        </>
    )
}
