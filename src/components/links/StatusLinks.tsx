'use client'

import { useLinksStore } from '@/store';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoCheckmarkOutline, IoWarningOutline, IoLinkOutline } from 'react-icons/io5'
import { Link } from '@prisma/client';
import { getUserLinks } from '@/action';
import { useSession } from 'next-auth/react';
import { StatusLinksSeleton } from '..';





export const StatusLinks = () => {

    const changeStatus = useLinksStore(state => state.changeStatus);
    const status = useLinksStore(state => state.status);
    const [isLoading, setIsLoading] = useState(true);
    const [links, setLinks] = useState<Link[]>([]);
    const { data: session } = useSession();

   
    useEffect(() => {
        const getLinks = async () => {
            const links = await getUserLinks(session?.user!.id!);
           
            setLinks(links.links!);
            setIsLoading(false);
        }
        getLinks();

      
    }, [session?.user]);

    if (isLoading) {
        return (
            <StatusLinksSeleton />
        );
    };
    

    return (
        <section className="flex flex-wrap -mx-6">
            {/* ACTIVE */}
            <button
                onClick={() => changeStatus(true)}
                className="w-full px-6 sm:w-1/2 xl:w-1/3 "
            >
                <div className={
                    clsx(
                        "flex items-center px-5 py-6 bg-white  rounded-md shadow-sm",
                        {
                            'bg-violet-200': status === true,
                        }
                    )
                }>
                    <div className="p-3 bg-green-600 bg-opacity-75 rounded-full">
                        <IoCheckmarkOutline size={30} />
                    </div>

                    <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">{links.reduce((acc, link) => acc + (link.isActive ? 1 : 0), 0)}</h4>
                        <div className="text-gray-500">{links.length === 1 ? 'Activo' : 'Activos'}</div>
                    </div>
                </div>
            </button>
            {/* INACTIVE  */}
            <button
                onClick={() => changeStatus(false)}
                className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0"
            >
                <div className={
                    clsx(
                        "flex items-center px-5 py-6 bg-white  rounded-md shadow-sm",
                        {
                            'bg-violet-200': status === false,
                        }
                    )
                }>
                    <div className="p-3 bg-yellow-600 bg-opacity-75 rounded-full">
                        <IoWarningOutline size={30} />
                    </div>

                    <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">{links.reduce((acc, link) => acc + (!link.isActive ? 1 : 0), 0)}</h4>
                        <div className="text-gray-500">Sin activar</div>
                    </div>
                </div>
            </button>
            {/* TOTAL CREADOS */}
            <button
                onClick={() => changeStatus(undefined)}
                className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0"
            >
                 <div className={
                    clsx(
                        "flex items-center px-5 py-6 bg-white  rounded-md shadow-sm",
                        {
                            'bg-violet-200': status === undefined,
                        }
                    )
                }>
                    <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                        <IoLinkOutline size={30} />
                    </div>

                    <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">{links.length}</h4>
                        <div className="text-gray-500">Total creados</div>
                    </div>
                </div>
            </button>
        </section>
    )
}
