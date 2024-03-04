
import { ModalLink } from '..';
import { auth } from '@/auth.config';
import { LinksItems } from './LinksItems';
import { getLinkBySlug } from '@/action';

interface Props {
    short: string;
}
;export const SingleLink = async ({ short }: Props) => {

    const session = await auth();

    const {ok, links} = await getLinkBySlug(short);

    return (
        <section className="flex flex-col">
            <ModalLink short={short} />
            <div className="py-2 -my-2  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                    className="inline-block min-w-full align-middle border-b border-gray-200 shadow sm:rounded-lg">
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
                                {
                                    session && (
                                        <>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                QR</th>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                Editar</th>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                Eliminar</th>
                                        </>

                                    )
                                }

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <LinksItems links={links} />

                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
