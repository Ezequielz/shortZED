import { notFound, redirect } from "next/navigation";
import { PlanName } from '@prisma/client';
import { OrdersItems } from "./OrdersItems"

type Order = ({
    link: {
        shortUrl: string;
        limit: number | null;
        url: string;
    };
    plan: {
        name: PlanName;
        limit: number | null;
        price: number;
    };
    code: {
        name: string;
        discount: number;
    } | null;

} & {
    id: string;
    isPaid: boolean;
    total: number;
})

interface Props {
    orders: Order[] | undefined

}

export const TableOrders = async ({ orders }: Props) => {

    if (!orders) {
        notFound()
    }

    if (orders.length === 0) {
        redirect(`/orders?page=1`);
    }

    return (
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
    )
}
