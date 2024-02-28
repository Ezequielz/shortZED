import { getCodeById, getLinkById, getOrderById, getPlanById } from "@/action";
import { auth } from "@/auth.config";
import { CheckoutForm, OrdenConfirm } from "@/components";
import { getVencimientoDelPlan } from "@/helpers";
import { PlanName } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}
//TODO terminar order por id page
export default async function ({ params }: Props) {
    const { id } = params
    const session = await auth();
    if (!session) {
        redirect('/auth/login')
    }

    const { ok, order } = await getOrderById(id)

    if (!ok) {
        notFound()
    }

    const [{ ok: okLink, links }, { ok: okPlan, plan }, { ok: okCode, code }] = await Promise.all([
        getLinkById(order?.linkId as string),
        getPlanById(order?.planId as string),
        getCodeById(order?.codeId as string)
    ])


    if (!okLink || !okPlan) {
        notFound()
    }
    const vencimiento = getVencimientoDelPlan(links![0].updatedAt)

    const ordenShow = {
        link_corto: `${process.env.NEXT_PUBLIC_URL_DEV + links![0].shortUrl}`,
        link_original: links![0].url,
        clicks_actual: links![0].limit,
        vencimiento: vencimiento,
        plan_elegido: plan?.name as PlanName,
        sub_total: order?.subTotal,
        impuestos: order?.tax,
        codigo_descuento: code?.name,
        total: order?.total,
        userId: order?.userId

    }
    return (

        <div className="min-w-screen min-h-screen  py-5">
            {/* TITULO */}
            <div className="px-5">

                <div className="mb-2">
                    <h1 className="text-3xl sm:text-5xl font-bold ">Orden </h1>
                </div>

            </div>


            <div className="w-full  border-t border-b border-gray-200  py-10 ">
                <div className={
                    clsx(
                        " lg:flex justify-between p-2 mb- 2",
                        { 'bg-red-500': !order?.isPaid },
                        { 'bg-green-500': order?.isPaid }
                    )
                }
                >
                    <h2> Número de orden:  {order?.id.split('-').at(-1)} </h2>

                    <span>
                        {order?.isPaid ? 'Pagada' : 'Pendiente de pago'}

                    </span>

                </div>


                <div className="w-full mt-2">
                    <div className="-mx-3 lg:flex  items-start gap-2">
                        {/* Detalles de la orden */}
                        <div className="px-3 lg:w-3/5 ">
                            <div className="mx-auto  font-light mb-6 pb-6">

                                <div className="flex flex-col-reverse md:flex-row md:justify-between item-center">

                                    {/* Details */}

                                    <ul className="w-full  ">
                                        {
                                            Object.entries(ordenShow).map(([prop, value]) => (
                                                <li key={prop} className="p-2 flex justify-between items-center odd:bg-neutral-600">
                                                    <span className="capitalize">{prop.replace('_', ' ')}:</span>
                                                    {
                                                        typeof (value) === 'string' && value.length > 30 ? (

                                                            <span className="w-[350px] break-words text-xs text-right">{value.length > 150 ? value.slice(0, 150) + '...' : value}</span>
                                                        ) : (

                                                            <span className="">{value}</span>
                                                        )
                                                    }

                                                </li>
                                            ))
                                        }
                                    </ul>

                                    {/* <a href={links![0].shortUrl} download className="mt-2 w-12 h-12  overflow-hidden rounded-lg sm:w-28 sm:h-28 bg-gray-50 border border-gray-200">

                                        <Image
                                            src={links![0].qr}
                                            alt='QR del link'
                                            height={150}
                                            width={150}
                                        />
                                    </a> */}

                                </div>
                            </div>
                            {/* PAGO FORM */}
                            {/* <CheckoutForm /> */}

                        </div>

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

                            <OrdenConfirm />

                        </div>
                    </div>
                </div>

            </div>


        </div>

    );
}