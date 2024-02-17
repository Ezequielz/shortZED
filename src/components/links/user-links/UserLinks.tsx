import { IoCheckmarkOutline, IoAddOutline, IoLinkOutline } from 'react-icons/io5';
import { Links } from '../Links';

interface Props {
    links: ({
        user?: {
            name: string | null;
            email: string | null;
            image: string | null;
        } | null;
    } & {
        id: string;
        url: string;
        createdAt: Date;
        shortUrl: string;
        clicks: number;
        userId: string | null;
    })[]
}

export const UserLinks = ({ links }: Props) => {

    if (!links) {
        return <div>Loading...</div>
    }

    if (links.length === 0) {
        return (
            <div>No tiene ningún acortador creado</div>
        )
    }

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
            <div className="container px-6 py-8 mx-auto">
                <h3 className="text-3xl font-medium text-gray-700">Links</h3>

                <div className="mt-4">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                <div className="p-3 bg-green-600 bg-opacity-75 rounded-full">
                                   <IoCheckmarkOutline size={30}/>
                                </div>

                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">{ links.length  }</h4>
                                    <div className="text-gray-500">{ links.length === 1 ? 'Activo' : 'Activos' }</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                                 <IoAddOutline size={30} />
                                </div>

                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">200,521</h4>
                                    <div className="text-gray-500">Sin activar</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                                    <IoLinkOutline size={30} />
                                </div>

                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">{ links.length }</h4>
                                    <div className="text-gray-500">Total creados</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">

                </div>

                {/* LINKS */}
                <Links links={links} />
            

            </div>
        </main>
    )
}
