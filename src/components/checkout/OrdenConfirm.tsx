'use client'
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PlanName } from '@prisma/client';
import { IoIosArrowForward } from 'react-icons/io';
import { useCheckoutStore } from '@/store';
import { placeOrder } from '@/action';
import Link from 'next/link';


export const OrdenConfirm = () => {

    const { data: session } = useSession();
    const { slug } = useParams<{slug: string}>();
    const plan = useCheckoutStore(state => state.plan);
    const code = useCheckoutStore(state => state.code);

    const router = useRouter();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [orderId, setOrderId] = useState('')

    if (!session) return null;

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true)

        const order = {
            hash: slug,
            plan: plan,
            code: code.name,
        }
        //! Server Action
        const resp = await placeOrder(order);
        if (!resp.ok) {
            setIsPlacingOrder(false)
            setErrorMessage(resp.message);
            if (resp.orderId) {
                setOrderId(resp.orderId);
            }
            return
        }

        //* Todo salio bien

        router.replace('/order/' + resp.order?.id);

    }

    return (
        <div className="w-full mx-auto rounded-lg  border border-gray-200 p-3  font-light mb-6">

            <div className="w-full flex mb-3 items-center">
                <div className="w-32">
                    <span className=" font-semibold">Usuario</span>
                </div>
                <div className="flex-grow pl-3">
                    <span> {session.user?.name} </span>
                </div>
            </div>

            <div className="w-full flex mb-3 items-center">
                <div className="w-32">
                    <span className=" font-semibold">Email</span>
                </div>
                <div className="flex-grow pl-3">
                    <span> {session.user?.email} </span>
                </div>
            </div>

            <div className="w-full flex mb-3 items-center">
                <div className="w-32">
                    <span className=" font-semibold">Plan</span>
                </div>
                <div className="flex-grow pl-3">
                    <span> {plan} </span>
                </div>
            </div>

            <div className="w-full flex mb-3 items-center">
                <div className="w-32">
                    <span className=" font-semibold">Link</span>
                </div>
                <div className="flex-grow pl-3">
                    <span> {process.env.NEXT_PUBLIC_URL! + slug} </span>
                </div>
            </div>
            <div className="flex w-fit m-auto justify-center flex-col">
            

                <button
                    onClick={onPlaceOrder}
                    disabled={isPlacingOrder}
                    className={`
                        ${isPlacingOrder && 'btn-disabled'} 
                        inline-flex mt-2 group relative overflow-hidden bg-violet-600 focus:ring-4 focus:ring-blue-300  items-center pl-7 pr-5 py-2.5 rounded-lg text-white justify-center gap-1`}
                >

                    <span className="z-5">Confirmar</span>
                    <IoIosArrowForward size={20} className='transition-all duration-300 group-hover:translate-x-1' />

                    <div
                        className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
                    </div>
                </button>
                {
                    errorMessage && (
                        <>
                            <p className="text-red-500">{ errorMessage }</p>
                            <Link href={`/order/${orderId}`}>
                                Ver orden
                            </Link>
                        </>
                    )
                }

            </div>
        </div>
    )
}
