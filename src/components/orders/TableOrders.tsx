import { notFound } from "next/navigation";
import { StatusBoxs } from ".."
import { OrdersItems } from "./OrdersItems"
import { auth } from "@/auth.config";
import { getOrderByUser } from "@/action";

export const TableOrders = async() => {
    const session = await auth();
    const { orders } = await getOrderByUser(session!.user!.id! ?? '');

    if (!orders) {
        notFound();
    }
    const orderStatus = [
        orders.reduce((acc, order) => acc + (order.isPaid ? 1 : 0), 0),
        orders.reduce((acc, order) => acc + (!order.isPaid ? 1 : 0), 0),
        orders.length,
    ]
    return (
        <>
            <div className="py-4">
                <StatusBoxs boxsTitle={['Pagado', 'Pendiente', 'Total']} quantity={[orderStatus[0], orderStatus[1], orderStatus[2]]} />
            </div>
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


                    <OrdersItems orders={orders}/>
                </tbody>
            </table>
        </>
    )
}
