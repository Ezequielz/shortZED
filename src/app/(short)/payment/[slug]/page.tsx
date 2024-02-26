import { getLink } from "@/action";
import { auth } from "@/auth.config";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

interface Props {
    searchParams?: {
        [key: string]: string | undefined,
    };
    params: {
        slug: string;
    };
}

const Plans = ['basico', 'popular', 'empresarial'] as const;
type Plan = typeof Plans[number];

export default async function LinkPage({ params, searchParams }: Props) {
    const { slug } = params;


    const session = await auth();
    let plan: Plan = 'basico';

    if (!session) {
        redirect('/login')
    }

    const { ok, links } = await getLink(slug);

    if (!ok) {
        notFound();
    }

    const link = links![0]



    if (searchParams?.plan && Plans.includes(searchParams?.plan as Plan)) {
        plan = searchParams.plan as Plan
    }





    return (

        <div className="min-w-screen min-h-screen  py-5">
            {/* TITULO */}
            <div className="px-5">

                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold ">Activación </h1>
                </div>

            </div>


            <div className="w-full  border-t border-b border-gray-200 px-5 py-10 ">

                <div className="w-full">
                    <div className="-mx-3 md:flex items-start">
                        {/* PLAN A ELEGIR */}
                        <div className="px-3 md:w-7/12 lg:pr-10">
                            <div className="w-full mx-auto  font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex items-center">
                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <Image
                                            src={link.qr}
                                            alt='QR del link'
                                            height={100}
                                            width={100}
                                        />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <p className="font-semibold text-violet-400">Limite clicks actual: <span className="font-semibold uppercase text-white"> {link.limit}</span> </p>
                                        <p className="text-gray-400">Link original</p>
                                        <h6 className="font-semibold uppercase "> {link.url} </h6>
                                        <p className="text-gray-400">Link corto</p>
                                        <h6 className="font-semibold uppercase "> {process.env.NEXT_PUBLIC_URL_DEV}{link.shortUrl} </h6>
                                    </div>
                                    <div className="flex flex-col border-2 border-violet-600 p-5 rounded-lg">
                                        {/* <p className="text-gray-400">estado: {link.isActive ? 'Activo' : 'Inactivo'} </p> */}
                                        {/* <p className="text-gray-400">clicks: {link.clicks} </p> */}
                                        <p className="text-green-400 text-xl font-semibold">Plan Popular</p>
                                        <p className="text-green-400">Limite 300 clicks</p>
                                        <span className="font-semibold  text-4xl mx-auto mt-2">$50.00</span>
                                    </div>
                                </div>
                            </div>
                            {/* CODIGO DESCUENTO */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label className=" font-semibold text-sm mb-2 ml-1">Código de descuento</label>
                                        <div>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">Aplicar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 ">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$50.00</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="">impuestos (5%)</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">${50 * 0.05}  </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none  text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold text-gray-400 text-sm">USD</span> <span className="font-semibold">${50 * 1.05} </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PAGO */}
                        <div className="px-3 md:w-5/12">
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
                                        <span> {session.user?.name} </span>
                                    </div>
                                </div>
                            </div>
                            {/* PAYPAL */}
                            <div className="w-full mx-auto rounded-lg border border-gray-200  font-light mb-6">

                                <div className="w-full p-3 border-b border-gray-200">



                                    <div className="w-full p-3">
                                        <label className="flex items-center cursor-pointer">

                                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" className="ml-3" />
                                        </label>

                                    </div>
                                </div>


                                <div>
                                    <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )
}