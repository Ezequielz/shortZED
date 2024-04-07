
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { getOrdersByUser } from '@/action';
import { Pagination, StatusBoxs, TableOrders } from '..';



interface Props {
    row?: number;
    short?: string;
    page?: number;
    status?: string | undefined;
}

export const UserOrders = async ({ row, short, page, status }: Props) => {
    const session = await auth();
    const isPaid = status ? (status === 'true' ? true : false) : undefined;

    if (!session?.user?.id) {
        redirect('/');
    };

    const { orders, totalPages, ordersPaid, ordersNotPaid, ordersTotal } = await getOrdersByUser({ page, isPaid });

    if (!orders) {
        notFound();
    };

    return (
        <>
            <div className="py-4">
                <StatusBoxs boxsTitle={['Pagado', 'Pendiente', 'Total']} quantity={[ordersPaid, ordersNotPaid, ordersTotal]} />
            </div>
            {
                orders && orders.length === 0 ? (
                    <div className='text-center text-2xl lg:min-h-[450px]'>No se encontraron ordenes { status ? (status === 'true' ? 'Pagadas' : 'Pendientes') : ''}</div>
                ) : (
                    <>
                        <div className='lg:min-h-[400px]'>

                            <TableOrders orders={orders} />
                        </div>
                        <Pagination totalPages={totalPages} />
                    </>
                )
            }
        </>
    )
}
