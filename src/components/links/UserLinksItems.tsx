'use client'

import { useEffect, useState } from "react";
import { Link } from '@prisma/client'
import { clsx } from 'clsx'
import { useSnackbar } from 'notistack'
import { IoCopyOutline } from 'react-icons/io5'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { LinkSkeleton } from "..";

interface Props {
    userLinks?: Link[] | undefined, 
    
}
export const UserLinksItems = ({ userLinks }: Props) => {

    // const [active, setActive] = useState(undefined)
    const [isLoadingLinks, setIsLoadingLinks] = useState(false)
    const [links, setLinks] = useState<Link[] | undefined>([]);
    const { enqueueSnackbar } = useSnackbar();

    // const handleActive = (e: React.MouseEvent<HTMLElement>, link: Link) => {
    //     setActive(link.id)
    //     link.isActive = !link.isActive
    //     setLinks([...links])
    // }

    // const handleDelete = async (e: React.MouseEvent<HTMLElement>, link: Link) => {
    //     const res = await fetch(`/api/links/${link.id}`, {
    //         method: 'DELETE'
    //     })

    //     if (res.status === 200) {
    //         setLinks(links.filter(l => l.id !== link.id))
    //         enqueueSnackbar('Eliminado', { variant: "success" })
    //     }
    // }



    useEffect(() => {
        // console.log(userLinks)
        setLinks(userLinks)
        setIsLoadingLinks(true)
    }, [userLinks])



    const copyToClipboard = (e: React.MouseEvent<HTMLElement>, link: Link) => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL_DEV + link.shortUrl)
        enqueueSnackbar('Copiado en el portapapeles', { variant: "success" })
    }

    if (!isLoadingLinks) {
        return (
            <LinkSkeleton quantity={7} />
        )
    }

    if (!links) {
        return null
    }


    return (
        <tbody className="bg-white">
            {
                links.map(link => (
                    <tr key={link.id} className={
                        clsx(

                            {
                                'bg-gray-100 hover:bg-gray-200': link.isActive,
                                'bg-red-100 hover:bg-red-200': !link.isActive,
                            }
                        )
                    }>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-500">
                                {link.url.length > 20 ? link.url.slice(0, 20) + '...' : link.url}

                            </div>
                        </td>

                        <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-4 whitespace-nowrap">
                            <a className="hover:underline" href={process.env.NEXT_PUBLIC_URL_DEV + link.shortUrl}>
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
                            onClick={(e) => copyToClipboard(e, link)}
                            className=" px-16 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <IoCopyOutline size={20} className="cursor-pointer hover:text-violet-400 hover:scale-105" />
                        </td>
                        <td
                            className="px-10 py-4 text-sm leading-5 text-blue-500 whitespace-no-wrap border-b border-gray-200">
                            <MdOutlineEditCalendar size={20} />
                        </td>
                        <td
                            className="px-12 py-4 text-sm leading-5 text-red-500 whitespace-no-wrap border-b border-gray-200">
                            <RiDeleteBin2Line size={20} />
                        </td>


                    </tr>

                ))
            }

        </tbody>
    )
}
