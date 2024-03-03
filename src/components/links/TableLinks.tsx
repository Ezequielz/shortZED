
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { getUserLinks } from '@/action';
import { ModalLink, StatusBoxs } from '..'
import { LinksItems } from './LinksItems'

interface Props {
    row?: number;
    short: string;
}

export const TableLinks = async({ row, short }: Props) => {
    const session = await auth();


    if (!session?.user?.id) {
        redirect('/');
    };

    const { links, ok } = await getUserLinks(session.user.id);

    if (!links) {
        notFound();
    }

    const linksStatus = [
        links.reduce((acc, link) => acc + (link.isActive ? 1 : 0), 0),
        links.reduce((acc, link) => acc + (!link.isActive ? 1 : 0), 0),
        links.length]
        
    return (
        <>
            <ModalLink short={short} />
            <div className="py-4">
                <StatusBoxs boxsTitle={['Pagado', 'Pendiente', 'Total']} quantity={[linksStatus[0], linksStatus[1], linksStatus[2]]} />
            </div>
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


                    <LinksItems  links={links}/>
                </tbody>
            </table>
        </>
    )
}
