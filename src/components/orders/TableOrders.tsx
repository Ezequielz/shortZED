import { notFound, redirect } from "next/navigation";
import { Pagination, StatusBoxs } from ".."
import { OrdersItems } from "./OrdersItems"
import { getOrdersByUser } from "@/action";

interface Props {
    page?: number;
    status?: string | undefined;
}

export const TableOrders = async ({ page, status }: Props) => {
    const isPaid = status ? (status === 'true' ? true : false) : undefined;

    const { orders, totalPages, ordersPaid, ordersNotPaid, ordersTotal } = await getOrdersByUser({ page, isPaid });
  
    if ( orders && orders.length === 0) {
        return <div>No posee ordenes</div>
    }

    if (!orders) {
        notFound()
    }

    if (orders.length === 0) {
        redirect(`/orders?page=1`);
    }

    return (
        <>
            <div className="py-4">
                <StatusBoxs boxsTitle={['Pagado', 'Pendiente', 'Total']} quantity={[ordersPaid, ordersNotPaid, ordersTotal]} />
            </div>
            <div className='lg:min-h-[400px]'>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Orden</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Estado</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Link</th>

                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Plan</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Limite final</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Precio total</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Ver orden</th>
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Eliminar</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white">


                        <OrdersItems orders={orders} />
                    </tbody>
                </table>
            </div>
            <Pagination totalPages={totalPages} />
        </>
    )
}
