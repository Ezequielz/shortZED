import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLink } from '@/action';


interface Props {
    params: {
        slug: string
    }
}

export default async function ({ params }: Props) {

    const { slug } = params;

    const link = await getLink(slug);

    if (!link.ok) {
        notFound();
    };


    return (
        <div className=" flex items-center justify-center w-full">
            <div className="mt-10 w-1/2 flex flex-col">

                <h2 className="text-5xl font-bold text-red-600">Link inactivo</h2>
                <span className="text-red-300">{process.env.NEXT_PUBLIC_URL_DEV}{link.links![0].shortUrl}</span>
                <div className="my-3">

                    <p>Active el link desde el
                        <Link href={'/links'} className="m-1 text-violet-500 hover:text-violet-400">
                            panel de links
                        </Link>
                        si es el administrador del link.
                    </p>
                    <p>o informelo al que le proporcionó el link para que lo active.</p>
                </div>
                <span className="text-red-400">ID de reclamo: {link.links![0].id.split('-').at(-1)}</span>


                <Link href={'/'}
                    className="flex items-center justify-center mt-12 relative text-center h-20 w-60 transition-all duration-500
                                before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-violet-500 before:transition-all
                                before:duration-300 before:opacity-10 before:hover:opacity-0 before:hover:scale-50
                                after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:transition-all after:duration-300
                                after:border after:border-violet-500/50 after:scale-125 after:hover:opacity-100 after:hover:scale-100 
                                font-thin hover:text-violet-400 hover:font-semibold"
                >
                    <span className="uppercase ">Crear un short</span>
                </Link>

            </div>

            <Image
                src="/imgs/roblox1.png"
                alt={'403 Forbidden image'}
                width={300}
                height={300}
                className=''
            />





        </div>
    );
}