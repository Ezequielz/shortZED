import { auth } from '@/auth.config';
import clsx from 'clsx';
import { IoAccessibilityOutline } from 'react-icons/io5';
import { dateFormat } from '@/helpers';
import { getOrdersByUser, getUserById, getUserLinks } from '@/action';
import Link from 'next/link';
import { UserImage } from './UserImage';
import { Suspense } from 'react';

export const Profile = async () => {

    const session = await auth();
    if (!session?.user?.createdAt) {
        return null
    }

    const { totalCount: totalLinks, linksActive, linksInactive } = await getUserLinks({})
    const { totalCount: totalOrders, ordersPaid, ordersNotPaid } = await getOrdersByUser({})
    return (
        <div className="bg-neutral-800  rounded-xl">


            <div className="container mx-auto my-5 p-5 ">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-violet-600 rounded-xl">
                            <Suspense fallback={ <p className='text-neutral-900'>ESTOOOO</p> } >
                                <UserImage />

                            </Suspense>

                            <h2 className="text-gray-900 font-bold text-xl leading-8 my-1 capitalize">{session?.user?.name}</h2>

                            <ul
                                className="bg-neutral-800 text-gray-100 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Estado</span>
                                    <span className="ml-auto">
                                        <span
                                            className={
                                                clsx(
                                                    " py-1 px-2 rounded text-white text-sm",
                                                    {
                                                        'bg-green-500': session?.user?.isActive,
                                                        'bg-red-500': !session?.user?.isActive,
                                                    }
                                                )
                                            }>
                                            {session?.user?.isActive ? 'Activo' : 'Banned'}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Miembro desde:</span>
                                    <span className="ml-auto">{dateFormat(new Date(session.user.createdAt))}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="my-4"></div>

                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-xl">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <IoAccessibilityOutline size={30} className='text-violet-600' />
                                <span className="tracking-wide text-violet-600">{session.user.roles === 'user' ? 'Usuario' : 'Admin'}</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Nombre:</div>
                                        <div className="px-4 py-2 capitalize">{session.user.name}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email:</div>
                                        <div className="px-4 py-2">{session.user.email}</div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="my-4"></div>

                        <div className="bg-white p-3 shadow-sm rounded-xl">

                            <div className="grid grid-cols-2 gap-2 rounded-xl">

                                <Link
                                    href={'/links'}
                                    className='bg-violet-500 hover:bg-violet-600 rounded-xl p-2'>
                                    <div className=" flex flex-col items-center justify-center space-x-2 font-semibold  leading-8 mb-3">

                                        <span className="tracking-wide">Links</span>
                                        <div>
                                            Total links creados: {totalLinks}

                                        </div>
                                        <div>
                                            Links activos: {linksActive}
                                        </div>
                                        <div>
                                            Links inactivos: {linksInactive}
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    href={'/orders'}
                                    className='bg-violet-500 hover:bg-violet-600 rounded-xl p-2'>
                                    <div className=" flex flex-col items-center justify-center space-x-2 font-semibold  leading-8 mb-3">

                                        <span className="tracking-wide">Ordenes</span>
                                        <div>
                                            Total ordenes creados: {totalOrders}

                                        </div>
                                        <div>
                                            Ordenes pagadas: {ordersPaid}
                                        </div>
                                        <div>
                                            Ordenes pendiente de pago: {ordersNotPaid}
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
