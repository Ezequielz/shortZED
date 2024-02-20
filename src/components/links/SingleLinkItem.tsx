import { Link } from '@prisma/client'
import clsx from 'clsx'
import React from 'react'
import { IoCopyOutline } from 'react-icons/io5'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { RiDeleteBin2Line } from 'react-icons/ri'

interface Props {
    link: Link | undefined
}

export const SingleLinkItem = ({ link }: Props) => {
    if (!link ) return null
    return (
        <tbody className="bg-white">

            <tr className={
                clsx(

                    {
                        'bg-gray-50 hover:bg-gray-100': link.isActive,
                        'bg-red-50 hover:bg-red-100': !link.isActive,
                    }
                )
            }>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">
                        {link.url.length > 20 ? link.url.slice(0, 20) + '...' : link.url}

                    </div>
                </td>

                <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-4 whitespace-nowrap">
                    <a
                        className="hover:underline"
                        href={process.env.NEXT_PUBLIC_URL_DEV + link.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {process.env.NEXT_PUBLIC_URL_DEV + link.shortUrl}
                    </a>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span
                        className={
                            clsx(
                                "inline-flex px-2 text-xs font-semibold leading-5 rounded-full",
                                {
                                    'bg-green-200 text-green-800': link.isActive,
                                    'bg-red-200 text-red-800': !link.isActive,
                                }
                            )
                        }
                    >
                        {link.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                </td>


                <td
                    className="px-10 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    {link.clicks}</td>
                <td
                    className="px-10 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    {link.limit}</td>
                <td
                    // onClick={(e) => copyToClipboard(e, link)}
                    className=" px-16 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <IoCopyOutline size={20} className="cursor-pointer hover:text-violet-400 hover:scale-125" />
                </td>


            </tr>

        </tbody>
    )
}
