import { dateFormat, currencyFormat } from "@/helpers"
import clsx from "clsx"
import Link from "next/link"
import { OrderStatus, PaypalButton, PaypalDemoCredentials } from ".."
import { getOrderById, getLinkById, getPlanById, getCodeById, getUserById } from "@/action"
import { PlanName } from "@prisma/client"
import { notFound } from "next/navigation"
import Image from "next/image"


export const OrderCheckout = async({id} : {id: string}) => {

    const { ok, order } = await getOrderById(id)

    if (!ok) {
        notFound()
    }

    const [{ ok: okLink, links }, { ok: okPlan, plan }, { ok: okCode, code }, { ok: okUser, user }] = await Promise.all([
        getLinkById(order?.linkId as string),
        getPlanById(order?.planId as string),
        getCodeById(order?.codeId as string),
        getUserById(order?.userId as string)
    ])


    if (!okLink || !okPlan) {
        notFound()
    }

    const vencimiento = dateFormat(links![0].expires)

    const ordenShow = {
        link_corto: `${process.env.NEXT_PUBLIC_URL + links![0].shortUrl}`,
        link_original: links![0].url,
        limite_actual: links![0].limit,
        clicks_usados: links![0].clicks ? links![0].clicks : '0',
        vencimiento: vencimiento,
        plan_elegido: plan?.name as PlanName,
        sub_total: currencyFormat(order!.subTotal),
        impuestos: currencyFormat(order!.tax),
        descuento: code?.name ? `- ${currencyFormat(order!.subTotal * (code.discount / 100))}` : '-',
        total: currencyFormat(order!.total),
        usuario: user?.name,
        email: user?.email,
    }
    return (
        <div className="w-full  border-t border-b border-gray-200  py-6 ">

            <OrderStatus orderId={order!.id} isPaid={order!.isPaid} />


            <div className="w-full mt-2 lg:flex  items-start gap-2">
                {/* Detalles de la orden */}

                <ul className="w-full px-3 lg:w-3/5 lex flex-col md:flex-row md:justify-between item-center ">
                    {
                        Object.entries(ordenShow).map(([prop, value]) => (
                            <li key={prop} className="p-2 flex text-sm justify-between items-center odd:bg-neutral-700">
                                <span className="capitalize">{prop.replace('_', ' ')}:</span>
                                {
                                    typeof (value) === 'string' && value.length > 30 ? (

                                        <span className="w-[350px] break-words text-xs text-right">{value.length > 150 ? value.slice(0, 150) + '...' : value}</span>
                                    ) : (

                                        <span className={
                                            clsx(
                                                { 'capitalize': prop === 'usuario' }
                                            )
                                        }>{value ? value : '-'}</span>
                                    )
                                }

                            </li>
                        ))
                    }
                </ul>

                {/* PAGO */}
                <div className="px-3  lg:w-2/5 ">

                    <div className="flex flex-col justify-center items-center gap-2 mb-2">
                        <h3 className=" ">codigo QR del short</h3>
                        <a href={links![0].shortUrl} download className="w-12 h-12  overflow-hidden rounded-lg sm:w-28 sm:h-28 bg-gray-50">

                            <Image

                                src={links![0].qr}
                                alt='QR del link'
                                height={150}
                                width={150}
                            />
                        </a>

                    </div>

                    {
                        order!.isPaid ? (
                            <div className="flex  flex-col justify-center items-center border-2 border-violet-500 p-2 rounded-lg m-3.5">
                                <h4 className="flex justify-center font-semibold">Resumen</h4>
                                <p>Actualizaste el limite a {links![0].limit ? links![0].limit! : 'clicks ilimitados'}</p>
                                <p>con vencimiento el {dateFormat(links![0].expires)}</p>
                                <Link href={'/links'} className=''>
                                    Ver links
                                </Link>

                            </div>
                        ) : (
                            <>

                                <div className="border-2 border-violet-500 p-2 rounded-lg m-3.5">
                                    <h4 className="flex justify-center font-semibold">Resumen</h4>
                                    <p>Te quedan {links![0].limit! - links![0].clicks!} clicks de uso.</p>
                                    <p>Con el plan {plan?.name} Aumentarás el limite de {links![0].limit} a {plan?.limit ? (links![0].limit! + plan!.limit!) : 'ilimitados'}. </p>

                                    <p>El valor total de {currencyFormat(order!.total)}</p>

                                </div>
                                <PaypalDemoCredentials />
                                <PaypalButton orderId={order!.id} amount={order!.total} limitUpdate={plan!.limit} linkId={order!.linkId} />
                            </>
                        )
                    }


                </div>
            </div>

        </div>
    )
}
