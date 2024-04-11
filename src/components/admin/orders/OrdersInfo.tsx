import { getAllOrders } from "@/action";

interface Props {
    children: React.ReactNode
}

export const OrdersInfo = async({ children }: Props) => {
    const { ordersCount, ordersNotPaid, ordersPaid } = await getAllOrders({});
    return (
        <div className="flex flex-col md:flex-row gap-2   w-full items-center justify-between bg-gradient-to-tr from-amber-600 to-amber-400 rounded-lg m-2 p-2">

            <div className="flex flex-row gap-2">
                <article className="bg-slate-100 text-neutral-900 p-2 rounded-xl flex gap-2  items-center justify-center">
                    <span> Total:</span>
                    <span>{ordersCount}</span>
                </article>
                <article className="bg-slate-100 text-neutral-900 p-2 rounded-xl flex gap-2  items-center justify-center">
                    <span> Pagas:</span>
                    <span>{ordersPaid}</span>
                </article>
                <article className="bg-slate-100 text-neutral-900 p-2 rounded-xl flex gap-2  items-center justify-center">
                    <span> Pendientes:</span>
                    <span>{ordersNotPaid}</span>
                </article>
            </div>
          
            
            {children}
        </div>
    )
}
