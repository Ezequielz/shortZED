'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { IoCheckmarkOutline, IoWarningOutline, IoLinkOutline } from 'react-icons/io5';
import { useLinksStore } from '@/store';
import Link from 'next/link';
import { useEffect } from 'react';


interface Props {
    boxsTitle: [string, string, string];
    quantity: [number, number, number];
};

export const StatusBoxs = ({ boxsTitle, quantity }: Props) => {

    const changeStatus = useLinksStore(state => state.changeStatus);
    const status = useLinksStore(state => state.status);
    
    const pathName = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        changeStatus(undefined);
    }, [changeStatus])
    

    const createStatusUrl = (status: boolean | undefined) => {

        const params = new URLSearchParams(searchParams);
        params.delete('short');
        params.set('page', '1');
        if (status === undefined) {
            params.delete('status');
            
            return `${pathName}?${params.toString()}`;
        }
        params.set('status', status.toString());
        
        return `${pathName}?${params.toString()}`;

    }

    return (
        <section className="flex flex-wrap -mx-6">
            {/* ACTIVE */}
            <Link
                href={createStatusUrl(true)}
                onClick={() => changeStatus(true)}
                className="w-full px-6 sm:w-1/2 xl:w-1/3 "
            >
                <div className={
                    clsx(
                        "flex items-center px-5 py-4  rounded-md shadow-sm",
                        {
                            'bg-violet-300': status === true ,
                            'bg-white': status !== true,
                        }
                    )
                }>
                    <div className="p-3 bg-green-600 bg-opacity-75 rounded-full">
                        <IoCheckmarkOutline size={30} />
                    </div>

                    <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">
                            {quantity[0]}
                            {/* {links.reduce((acc, link) => acc + (link.isActive ? 1 : 0), 0)} */}
                        </h4>
                        <div className="text-gray-500">{quantity[0] === 1 ? boxsTitle[0] : `${boxsTitle[0]}s`}</div>
                    </div>
                </div>
            </Link>
            {/* INACTIVE  */}
            <Link
                href={createStatusUrl(false)}
                onClick={() => changeStatus(false)}
                className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0"
            >
                <div className={
                    clsx(
                        "flex items-center px-5 py-4  rounded-md shadow-sm",
                        {
                            'bg-violet-300': status === false,
                            'bg-white': status !== false,
                        }
                    )
                }>
                    <div className="p-3 bg-yellow-600 bg-opacity-75 rounded-full">
                        <IoWarningOutline size={30} />
                    </div>

                    <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">
                            {quantity[1]}
                            {/* {links.reduce((acc, link) => acc + (!link.isActive ? 1 : 0), 0)} */}
                        </h4>
                        <div className="text-gray-500">{quantity[1] === 1 ? boxsTitle[1] : `${boxsTitle[1]}s`}</div>
                    </div>
                </div>
            </Link>
            {/* TOTAL CREADOS */}
            <Link
                href={createStatusUrl(undefined)}
                onClick={() => changeStatus(undefined)}
                className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0"
            >
                <div className={
                    clsx(
                        "flex items-center px-5 py-4   rounded-md shadow-sm",
                        {
                            'bg-violet-300': status === undefined,
                            'bg-white': status !== undefined,
                        }
                    )
                }>
                    <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                        <IoLinkOutline size={30} />
                    </div>

                    <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">
                            {quantity[2]}
                        </h4>
                        <div className="text-gray-500">{boxsTitle[2]}</div>
                    </div>
                </div>
            </Link>
        </section>
    )
}
