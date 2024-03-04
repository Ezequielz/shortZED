'use client'
import Link from 'next/link'
import { clsx } from 'clsx'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { currencyFormat } from '@/helpers'
import { PlanName } from '@prisma/client'
import { useLinksStore } from '@/store'
import { useEffect, useState } from 'react'

interface Props {
    orders: ({
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
    })[] | undefined

}


export const OrdersItems = ({ orders }: Props) => {

    const status = useLinksStore(state => state.status);
    const [ordersToShow, setOrdersToShow] = useState(orders)

    useEffect(() => {
        if (status && orders) {
            setOrdersToShow(orders.filter( order => order.isPaid ))
        }
        if ( status === false && orders) {
            setOrdersToShow(orders.filter( order => !order.isPaid ))
        }
        if (status === undefined) {
            setOrdersToShow(orders)
        }
        
    }, [status, orders])

    if (!ordersToShow) {
        return null;
    };

    return (
        <>
            {
                ordersToShow.map(order => (
                    <tr key={order.id} className={
                        clsx(
                            "text-gray-500",
                            {
                                'bg-gray-50 hover:bg-gray-100': order.isPaid,
                                'bg-red-50 hover:bg-red-100': !order.isPaid,
                            }
                        )
                    }>
                        <td className=" px-6 border-b text-gray-500 border-gray-200">
                            {order.id.split('-').at(-1)}
                        </td>

                        <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                            <span
                                className={
                                    clsx(
                                        "inline-flex px-2 text-xs font-semibold leading-5 rounded-full",
                                        {
                                            'bg-green-200 text-green-800': order.isPaid,
                                            'bg-red-200 text-red-800': !order.isPaid,
                                        }
                                    )
                                }
                            >
                                {order.isPaid ? 'Pagado' : 'Pendiente'}
                            </span>
                        </td>

                        <td className="px-6 py-3 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {process.env.NEXT_PUBLIC_URL_DEV + order.link.shortUrl}
                        </td>
                        <td
                            className="px-6 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {order.plan.name}</td>
                        <td
                            className="px-6 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {order.link.limit ? order.plan.limit! + order.link.limit : '∞'}</td>
                        <td
                            className="px-6 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {currencyFormat(order.total)}</td>
                        <td
                            className="px-6 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <Link href={`/order/${order.id}`} >

                                ver
                            </Link>
                        </td>
                        <td
                            // onClick={(e) => handleDeleteUrl(e, order)}
                            className="px-12 py-3 text-sm leading-5 text-red-400 whitespace-no-wrap border-b border-gray-200">
                            <RiDeleteBin2Line size={20} className="cursor-pointer hover:text-red-600 hover:scale-125" />
                        </td>

                    </tr>

                ))
            }
        </>



    )
}
