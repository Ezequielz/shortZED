import { Suspense } from 'react';
import { getAllOrders } from '@/action';
import { Pagination, TableOrders } from '@/components';


interface Props {
    page?: number;
    search?: string;
    short: string;
}

export const Orders = async ({ page, search, short }: Props) => {

    const { orders, totalPages } = await getAllOrders({ page, search });

    if (!orders) {
        return (<div>No hay links</div>);
    };

    if (orders.length === 0) {
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
            {/* <Suspense fallback={ <div>Cargando modal...</div> }>
                <ModalLink short={short} >
                   <ModalOptionsAdminLinks short={short} />
                </ModalLink>

            </Suspense> */}
            <div className="lg:min-h-[355px]  overflow-x-auto">
                {/* <TableLinks links={orders} /> */}
                <TableOrders orders={orders}/>
            </div>

            <Pagination totalPages={totalPages} />
        </>
    )
}
