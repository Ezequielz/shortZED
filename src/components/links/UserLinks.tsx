
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { getUserLinks } from '@/action';
import { ModalLink, ModalOptionsLinksByUser, Pagination, StatusBoxs, TableLinks } from '..';
import { Suspense } from 'react';


interface Props {
    row?: number;
    short: string;
    page?: number;
    status?: string | undefined;
}

export const UserLinks = async ({ row, short, page, status }: Props) => {
    const session = await auth();
    const isActive = status ? (status === 'true' ? true : false) : undefined;

    if (!session?.user?.id) {
        redirect('/');
    };

    const { links, totalPages, currentPage, linksActive, linksInactive, linksTotal } = await getUserLinks({ page, isActive });

    // if ( links && links.length === 0) {
    //    return <div>No posee links guardados</div>
    // }

    if (!links) {
        notFound();
    }

    // if (links.length === 0) {
    //     redirect(`/?page=1`)
    // }

    return (
        <>
            <Suspense fallback={<div>Cargando modal...</div>}>
                <ModalLink short={short} >
                    <ModalOptionsLinksByUser short={short} />
                </ModalLink>
            </Suspense>
            <div className="py-4">
                <StatusBoxs boxsTitle={['Activo', 'Inactivo', 'Total']} quantity={[linksActive, linksInactive, linksTotal]} />
            </div>
            {
                links && links.length === 0 ? (
                    <div className='text-center text-2xl lg:min-h-[450px]'>No se encontraron links {!status ? 'Activos' : 'Inactivos'} </div>
                ) : (
                    <>
                        <div className='lg:min-h-[400px]'>

                            <TableLinks links={links} />
                        </div>
                        <Pagination totalPages={totalPages} />
                    </>
                )
            }
        </>
    )
}
