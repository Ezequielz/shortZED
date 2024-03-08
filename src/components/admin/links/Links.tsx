import { Suspense } from 'react';
import { getAllLinks } from '@/action';
import { ModalLink, ModalOptionsAdminLinks, Pagination, TableLinks } from '@/components';


interface Props {
    page?: number;
    search?: string;
    short: string;
}

export const Links = async ({ page, search, short }: Props) => {

    const { links, totalPages } = await getAllLinks({ page, search });

    if (!links) {
        return (<div>No hay links</div>);
    };

    if (links.length === 0) {
        return (
            <div>
                <span>
                    No hay resultados
                </span>
            </div>
        );
    };

    return (
        <>
            <Suspense fallback={ <div>Cargando modal...</div> }>
                <ModalLink short={short} >
                   <ModalOptionsAdminLinks short={short} />
                </ModalLink>

            </Suspense>
            <div className="lg:min-h-[355px]">
                <TableLinks links={links} />

            </div>

            <Pagination totalPages={totalPages} />
        </>
    )
}
