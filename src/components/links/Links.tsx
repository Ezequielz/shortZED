'use client'

import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineEditCalendar } from "react-icons/md";
import { IoCopyOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { getUserLinks } from "@/action";
import { Link } from "@prisma/client";
import { useSnackbar } from "notistack";

interface Props {
    userId: string
}



export const Links =  ({userId}: Props) => {

    const [active, setActive] = useState(undefined)
    const [links, setLinks] = useState<Link[] | undefined>([]);
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
       const getLinks = async () =>{
         const links = await getUserLinks(userId, active)

         setLinks(links.links)
        }
        getLinks()
    }, [userId, active])


    const copyToClipboard = (e: React.MouseEvent<HTMLElement>, link: {
        id: string;
        url: string;
        createdAt: Date;
        shortUrl: string;
        clicks: number;
        limit: number;
        isActive: boolean;
        userId: string | null;
    }) => {
        navigator.clipboard.writeText( process.env.NEXT_PUBLIC_URL_DEV + link.shortUrl )
        enqueueSnackbar('Copiado en el portapapeles', { variant: "success" })
    }

    if (!links) {
        return <div>Loading...</div>
    
    }

    return (

        <div className="flex flex-col mt-8">
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
                                            onClick={(e) => copyToClipboard(e,link)}
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
                    </table>
                </div>
            </div>
        </div>


        // <section className="rounded-lg my-10 mx-auto">
        //     <table className="min-w-full">
        //         <thead className="bg-gray-200 border-b">
        //             <tr>
        //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        //                     Url
        //                 </th>
        //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        //                     Short url
        //                 </th>
        //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        //                     Clicks
        //                 </th>
        //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        //                     Estado
        //                 </th>
        //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        //                     Copy
        //                 </th>
        //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        //                     Edit
        //                 </th>

        //             </tr>
        //         </thead>
        //         <tbody>


        //             {
        //                 links.map(link => (
        //                     <tr
        //                         key={link.id}
        //                         className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
        //                     >



        //                         <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
        //                             {link.url.length > 60 ? link.url.slice(0, 60) + '...' : link.url}
        //                         </td>
        //                         <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        //                             <a className="hover:underline" href={process.env.URL_DEV + link.shortUrl}>
        //                                 {process.env.URL_DEV + link.shortUrl}
        //                             </a>
        //                         </td>
        //                         <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
        //                             {link.clicks}
        //                         </td>
        //                         <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
        //                             activo
        //                         </td>
        //                         <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
        //                             <FaRegCopy size={20} />
        //                         </td>
        //                         <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
        //                             <FaRegEdit size={20} />
        //                         </td>

        //                     </tr>

        //                 ))
        //             }

        //         </tbody>
        //     </table>


        // </section>


    )
}

