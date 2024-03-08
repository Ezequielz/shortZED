
import { notFound, redirect } from 'next/navigation';
import { LinksItems } from './LinksItems'

interface Props {
    links: ({
        user: {
            name: string | null;
            email: string | null;
            image: string | null;
        } | null;
    } & {
        id: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
        shortUrl: string;
        isActive: boolean;
        limit: number | null;
        qr: string;
        clicks: number;
        userId: string | null;
    })[]
}

export const TableLinks = async ({ links }: Props) => {


    if (!links) {
        notFound();
    }

    if (links.length === 0) {
        redirect(`/?page=1`)
    }

    return (

        <table className="min-w-full ">
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
                        Short</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        QR</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Editar</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Eliminar</th>

                </tr>
            </thead>
            <tbody className="bg-white">
                <LinksItems links={links} />
            </tbody>
        </table>

    )
}
