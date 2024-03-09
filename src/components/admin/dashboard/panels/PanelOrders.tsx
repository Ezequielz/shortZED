import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { getAllOrders } from '@/action';
import { TopInfo } from '.';

export const PanelOrders = async () => {
    const { ordersCount, ordersPaid, ordersNotPaid } = await getAllOrders({});
    return (
        <Link
            href={'/admin/orders'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-amber-600 hover:to-amber-400 hover:text-white"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-600 to-amber-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <IoCardOutline size={30} />
            </div>
            <TopInfo label='ordenes' totalCount={ordersCount} />
            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">
                <div className="flex flex-col items-center" >
                    {/*  */}
                </div>

                <div className="flex flex-col items-center">
                    <h4 className="font-normal">Estado</h4>
                    <ul>
                        <li>
                            Pagadas: {ordersPaid}
                        </li>
                        <li>
                            Pendientes: {ordersNotPaid}
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}
