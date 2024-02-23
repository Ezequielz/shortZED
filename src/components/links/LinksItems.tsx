'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Link } from '@prisma/client'
import { clsx } from 'clsx'
import { useSnackbar } from 'notistack'
import { IoCopyOutline } from 'react-icons/io5'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { LinkSkeleton } from '..';
import { useLinksStore } from '@/store';
import { getLink, getUserLinks } from '@/action';
import { useUIStore } from '../../store/ui/ui-store';
import { usePathname, useRouter } from 'next/navigation';


interface Props {
    slug?: string;
    singleShow?: boolean

}

export const LinksItems = ({ slug, singleShow }: Props) => {


    const router = useRouter();
    const path = usePathname();    
    const { data: session } = useSession();
    const { enqueueSnackbar } = useSnackbar();
    const status = useLinksStore(state => state.status);
    const openDialog = useUIStore(state => state.openDialog)
    const closeDialog = useUIStore(state => state.closeDialog)

    const [isLoadingLinks, setIsLoadingLinks] = useState(false);
    const [links, setLinks] = useState<Link[] | undefined>([]);


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
        closeDialog()
    }, [closeDialog])


    useEffect(() => {
        const getLinks = async () => {
            if (singleShow) {
                const res = await getLink(slug!, session?.user?.id!)
                return res;
            }
            const res = await getUserLinks(session?.user?.id!, status)
            return res;
        }


        getLinks().then(res => {
            setLinks(res.links)
            setIsLoadingLinks(true)
        })
        // console.log(userLinks)
    }, [session, status, slug, singleShow])



    const copyToClipboard = (e: React.MouseEvent<HTMLElement>, link: Link) => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL_DEV + link.shortUrl)
        enqueueSnackbar('Copiado en el portapapeles', { variant: "success" })
    }

    const handleOpenDialog = (e: React.MouseEvent<HTMLElement>, link: Link) => {
        openDialog()
        router.replace(`${path}?short=${link.shortUrl}`)
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
                            onClick={(e) => copyToClipboard(e, link)}
                            className=" px-16 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <IoCopyOutline size={20} className="cursor-pointer hover:text-violet-400 hover:scale-125" />
                        </td>
                        {
                            session?.user?.id && (
                                <>
                                    <td
                                        onClick={(e) => handleOpenDialog(e, link)}
                                        className="px-10 py-4 text-sm leading-5 text-blue-400 whitespace-no-wrap border-b border-gray-200">
                                        <MdOutlineEditCalendar size={20} className="cursor-pointer hover:text-blue-600 hover:scale-125" />
                                    </td>
                                    <td
                                        className="px-12 py-4 text-sm leading-5 text-red-400 whitespace-no-wrap border-b border-gray-200">
                                        <RiDeleteBin2Line size={20} className="cursor-pointer hover:text-red-600 hover:scale-125" />
                                    </td>
                                </>

                            )
                        }


                    </tr>

                ))
            }

        </tbody>

    )
}
