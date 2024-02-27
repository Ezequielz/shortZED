import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { getLink } from "@/action";
import { PaymentForm, PaypalButton } from "@/components";
import { getVencimientoDelPlan } from "@/helpers";

interface Props {
    params: {
        slug: string;
    };
}

export default async function ({ params }: Props) {
    const { slug } = params;

    const session = await auth();
    if (!session) {
        redirect('/auth/login')
    }

    const { ok: linkOk, links } = await getLink(slug);

    if (!linkOk) {
        notFound();
    }

    const link = links![0]
    const vencimiento = getVencimientoDelPlan(link.updatedAt)


    return (

        <div className="min-w-screen min-h-screen  py-5">
            {/* TITULO */}
            <div className="px-5">

                <div className="mb-2">
                    <h1 className="text-3xl sm:text-5xl font-bold ">Activación </h1>
                </div>

            </div>


            <div className="w-full  border-t border-b border-gray-200 px-5 py-10 ">

                <div className="w-full">
                    <div className="-mx-3 lg:flex  items-start gap-2">
                        {/* PLAN A ELEGIR */}
                        <div className="px-3 lg:w-3/5 ">
                            <div className="mx-auto  font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="flex flex-col-reverse md:flex-row md:justify-between item-center">


                                    {/* Details */}
                                    <div className=" pl-3 flex items-center ">

                                        <div className="w-full relative flex flex-col gap-3">



                                            <p className="font-semibold text-violet-400">Limite clicks actual: <span className="font-semibold uppercase text-white"> {link.limit ?? '∞'}</span> </p>
                                            <p className="-mt-4 text-gray-400 font-light text-xs">Vencimiento: {vencimiento}</p>

                                            <p className="-mb-4 text-gray-400">Link corto</p>
                                            <h6 className="font-semibold uppercase "> {process.env.NEXT_PUBLIC_URL_DEV}{link.shortUrl} </h6>

                                            <p className="-mb-4 text-gray-400">Link original</p>

                                            <a href={link.url} target="_blank" className="w-[320px] sm:w-[460px] hover:text-violet-300 ">
                                                <span className=" font-light text-xs break-words " >
                                                    {link.url}
                                                </span>
                                            </a>
                                        </div>



                                    </div>

                                    {/* Plan marco */}

                                    <a href={link.shortUrl} download className="w-12 h-12  overflow-hidden rounded-lg sm:w-28 sm:h-28 bg-gray-50 border border-gray-200">

                                        <Image
                                            src={link.qr}
                                            alt='QR del link'
                                            height={150}
                                            width={150}
                                        />
                                    </a>

                                </div>
                            </div>
                            {/* PAGO FORM */}
                            <PaymentForm />

                        </div>

                        {/* PAGO */}
                        <div className="px-3  lg:w-2/5">
                            {/* DATOS */}
                            <div className="w-full mx-auto rounded-lg  border border-gray-200 p-3  font-light mb-6">

                                <div className="w-full flex mb-3 items-center">
                                    <div className="w-32">
                                        <span className=" font-semibold">Usuario</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <span> {session.user?.name} </span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="w-32">
                                        <span className=" font-semibold">Email</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <span> {session.user?.email} </span>
                                    </div>
                                </div>
                            </div>
                            {/* PAYPAL */}
                            <div className="w-full mx-auto rounded-lg border border-gray-200  font-light mb-6">

                                <PaypalButton 
                                    amount={1}
                                    orderId=""
                                />




                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )
}