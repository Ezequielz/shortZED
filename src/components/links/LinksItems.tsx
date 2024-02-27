'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Link } from '@prisma/client'
import { clsx } from 'clsx'
import { useSnackbar } from 'notistack'
import { IoCopyOutline } from 'react-icons/io5'
import { MdOutlineEditCalendar, MdOutlineQrCode2 } from 'react-icons/md'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { useLinksStore } from '@/store';
import { deleteUrl, getLink, getUserLinks } from '@/action';
import { useUIStore } from '../../store/ui/ui-store';
import { usePathname, useRouter } from 'next/navigation';
import { LinksSkeleton } from '..';


interface Props {
    slug?: string;
    singleShow?: boolean,
    row?: number

};

export const LinksItems = ({ slug, singleShow, row = 7 }: Props) => {


    const router = useRouter();
    const path = usePathname();
    const { data: session } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    const status = useLinksStore(state => state.status);
    const refresh = useLinksStore(state => state.refreshLinks);
    const changeRefresh = useLinksStore(state => state.changeRefresh);

    const openDialog = useUIStore(state => state.openDialog);
    const closeDialog = useUIStore(state => state.closeDialog);

    const [isLoadingLinks, setIsLoadingLinks] = useState(false);
    const [links, setLinks] = useState<Link[] | undefined>([]);


    useEffect(() => {
        closeDialog();
    }, [closeDialog]);


    useEffect(() => {
        const getLinks = async () => {
            if (singleShow) {
                const res = await getLink(slug!);
                return res;
            };
            const res = await getUserLinks(session?.user?.id!, status);
            return res;
        };


        getLinks().then(res => {
            setLinks(res.links);
            setIsLoadingLinks(true);
        });
        // console.log(userLinks)
    }, [session, status, slug, singleShow, refresh]);



    const copyToClipboard = (e: React.MouseEvent<HTMLElement>, link: Link) => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL_DEV + link.shortUrl);
        enqueueSnackbar('Copiado en el portapapeles', { variant: "success" });
    };

    const handleOpenDialog = (e: React.MouseEvent<HTMLElement>, link: Link) => {
        openDialog();
        changeRefresh();
        router.replace(`${path}?short=${link.shortUrl}`);
    };

    const handleDeleteUrl = async (e: React.MouseEvent<HTMLElement>, link: Link) => {
        await deleteUrl(link.shortUrl, session?.user?.id!);
        // window.location.reload();
        changeRefresh();
        // router.refresh();

    };

    if (!isLoadingLinks) {

        return (
            <LinksSkeleton row={singleShow ? 1 : row} />
        );
    };

    if (!links) {
        return null;
    };


    return (
        <>
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
                        <td className=" px-6 border-b border-gray-200">
                            <div className='py-5 group relative'>

                                <a href={link.url} target='_blank' rel='noreferrer' className="  text-sm  text-gray-500 w-[320px]">
                                    {link.url.length > 30 ? link.url.slice(0, 30) + '...' : link.url}


                                </a>

                                <div className="hidden absolute left-32  -bottom-0 origin-bottom  rounded text-white opacity-0 transition-all duration-300 group-hover:block group-hover:opacity-100">
                                    <div className="flex max-w-xs flex-col items-center">
                                        <a href={link.url} target='_blank' rel='noreferrer' className="rounded bg-violet-500 p-2 text-xs text-center shadow-lg w-[250px] break-words">{link.url}</a>
                                        {/* <div className="clip-bottom h-2 w-4 bg-gray-900"></div> */}
                                    </div>
                                </div>


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
                            {link.limit ?? '∞'}</td>
                        <td
                            onClick={(e) => copyToClipboard(e, link)}
                            className=" px-8 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <IoCopyOutline size={20} className="cursor-pointer hover:text-violet-400 hover:scale-125" />
                        </td>
                        {
                            session?.user?.id && (
                                <>
                                    <td
                                        className="px-6 py-4 text-sm leading-5 text-violet-400 whitespace-no-wrap border-b border-gray-200">
                                        <a href={link.qr} download={link.qr}>

                                            <MdOutlineQrCode2 size={20} className="cursor-pointer hover:text-violet-600 hover:scale-125" />
                                        </a>
                                    </td>
                                    <td
                                        onClick={(e) => handleOpenDialog(e, link)}
                                        className="px-10 py-4 text-sm leading-5 text-blue-400 whitespace-no-wrap border-b border-gray-200">
                                        <MdOutlineEditCalendar size={20} className="cursor-pointer hover:text-blue-600 hover:scale-125" />
                                    </td>
                                    <td
                                        onClick={(e) => handleDeleteUrl(e, link)}
                                        className="px-12 py-4 text-sm leading-5 text-red-400 whitespace-no-wrap border-b border-gray-200">
                                        <RiDeleteBin2Line size={20} className="cursor-pointer hover:text-red-600 hover:scale-125" />
                                    </td>

                                </>

                            )
                        }


                    </tr>

                ))
            }
        </>



    )
}
