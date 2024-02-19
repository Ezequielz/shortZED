
import { getUserLinks } from "@/action";
import { LinksItems } from "./LinksItems";
import { IoCheckmarkOutline, IoWarningOutline, IoLinkOutline } from "react-icons/io5";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export const UserLinks = async () => {

    const session = await auth();

    if (!session?.user?.id) {
        redirect('/');
    }

    const { links, ok } = await getUserLinks(session.user.id);

    if (!ok || !links) {
        return <div>Loading...</div>
    }

    if (links!.length === 0) {
        return (
            <div>No tiene ningún acortador creado</div>
        )
    }

    return (
        <>
            <section className="flex flex-wrap -mx-6">
                {/* ACTIVE */}
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                        <div className="p-3 bg-green-600 bg-opacity-75 rounded-full">
                            <IoCheckmarkOutline size={30} />
                        </div>

                        <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-gray-700">{links.reduce((acc, link) => acc + (link.isActive ? 1 : 0), 0)}</h4>
                            <div className="text-gray-500">{links.length === 1 ? 'Activo' : 'Activos'}</div>
                        </div>
                    </div>
                </div>
                {/* INACTIVE  */}
                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                        <div className="p-3 bg-yellow-600 bg-opacity-75 rounded-full">
                            <IoWarningOutline size={30} />
                        </div>

                        <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-gray-700">{links.reduce((acc, link) => acc + (!link.isActive ? 1 : 0), 0)}</h4>
                            <div className="text-gray-500">Sin activar</div>
                        </div>
                    </div>
                </div>
                {/* TOTAL CREADOS */}
                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                        <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                            <IoLinkOutline size={30} />
                        </div>

                        <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-gray-700">{links.length}</h4>
                            <div className="text-gray-500">Total creados</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Url</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Short Url</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Estado</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Clicks</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Limite</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Copiar Short</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Editar</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Eliminar</th>

                                </tr>
                            </thead>

                            <LinksItems userLinks={links} />
                        </table>
                    </div>
                </div>
            </section>
        </>




    )
}

