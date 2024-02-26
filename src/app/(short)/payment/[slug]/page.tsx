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
        redirect('/auth/login')
    }

    const { ok, links } = await getLink(slug);

    if (!ok) {
        notFound();
    }

    const link = links![0]

    let url = ''
    for (let i = 0; i < link.url.length; i++) {
        url += link.url[i];

        if (url.length === 50 && link.url[i + 1] !== '/') {
            const lastSlashIndex = url.lastIndexOf('/');
            if (lastSlashIndex !== -1) {

                if (url.length >= 50) {
                    url += '\n';
                }
                url = url.substring(0, lastSlashIndex + 1) + '\n' + url.substring(lastSlashIndex + 1);
            }
        }
    }


    if (searchParams?.plan && Plans.includes(searchParams?.plan as Plan)) {
        plan = searchParams.plan as Plan
    }





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
                        <div className="px-3 lg:w-2/3 ">
                            <div className="mx-auto  font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="flex flex-col-reverse md:flex-row md:justify-between item-center">


                                    {/* Details */}
                                    <div className=" pl-3 flex items-center ">

                                        <div className="w-full relative flex flex-col gap-3">

                                            <a href={link.shortUrl} download className="w-12 h-12 absolute right-0 sm:right-5 overflow-hidden rounded-lg sm:w-28 sm:h-28 bg-gray-50 border border-gray-200">
                                                
                                                <Image
                                                    src={link.qr}
                                                    alt='QR del link'
                                                    height={150}
                                                    width={150}
                                                />
                                            </a>

                                            <p className="font-semibold text-violet-400">Limite clicks actual: <span className="font-semibold uppercase text-white"> {link.limit}</span> </p>

                                            <p className="-mb-4 text-gray-400">Link corto</p>
                                            <h6 className="font-semibold uppercase "> {process.env.NEXT_PUBLIC_URL_DEV}{link.shortUrl} </h6>

                                            <p className="-mb-4 text-gray-400">Link original</p>

                                            <a href={link.url} target="_blank"   className="w-[320px] sm:w-[460px] hover:text-violet-300 ">
                                                <span className=" font-light text-xs break-words " >
                                                    {url}
                                                </span>
                                            </a>
                                        </div>



                                    </div>

                                    {/* Plan marco */}
                                    <div className="w-[300px] sm:w-fit  p-2 m-auto">
                                 
                                        <div className="h-fit flex md:flex-col border-2 border-violet-600  rounded-lg p-4">
                                            <div>

                                            <p className="text-green-400 text-lg md:text-xl font-semibold">Plan Popular</p>
                                            <p className="text-green-400">Limite 300 clicks</p>
                                            </div>
                                            <span className="font-semibold text-xl md:text-4xl mx-auto mt-2">$50.00</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* CODIGO DESCUENTO */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label className=" font-semibold text-sm mb-2 ml-1">Código de descuento</label>
                                        <div>
                                            <input className="w-full px-3 py-2 border text-slate-900 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
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

                            <div className="mb-6 pb-6 border-b border-gray-200 sm:border-none  text-xl">
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
                        <div className="px-3  lg:w-1/3">
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