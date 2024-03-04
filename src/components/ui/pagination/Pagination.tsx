'use client'

import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { generatePaginationNumbers } from '@/helpers';

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName);
    };



    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathName}?${params.toString()}`;
        };

        if (+pageNumber <= 0) {
            params.delete('page');
            return `${pathName}?${params.toString()}`;
        };

        if (+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}`;
        };


        params.set('page', pageNumber.toString());

        return `${pathName}?${params.toString()}`;

    }


    return (
        <div className="flex text-center justify-center m-2">

            <nav aria-label="">

                <ul className="flex items-center list-style-none gap-1">

                    <li className=" ">
                        <Link
                            className="page-link relative block py-1 px-1  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 hover:text-white hover:bg-violet-300 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)} >
                            <IoChevronBackOutline size={20} />
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (

                            <li className="" key={page + '-' + index}>
                                <Link
                                    className={
                                        clsx(
                                            "page-link relative block py-1 px-2  border-0 outline-none transition-all duration-300 rounded text-slate-400 hover:text-white hover:bg-violet-400 focus:shadow-none",
                                            {
                                                'bg-violet-600 shadow-sm text-white hover:bg-violet-400 ': page === currentPage,
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}
                                >
                                    {page}
                                </Link>
                            </li>
                        ))
                    }



                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1 px-1  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 hover:text-white hover:bg-violet-300 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={20} />
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
