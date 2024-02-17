import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineEditCalendar } from "react-icons/md";
import { IoCopyOutline } from 'react-icons/io5';


interface Props {
    links: ({
        user?: {
            name: string | null;
            email: string | null;
            image: string | null;
        } | null;
    } & {
        id: string;
        url: string;
        createdAt: Date;
        shortUrl: string;
        clicks: number;
        userId: string | null;
    })[]
}


export const Links = async ({ links }: Props) => {


    if (!links) {
        return <div>Loading...</div>
    }

    if (links.length === 0) {
        return (
            <div>No tiene ningún acortador creado</div>
        )
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
                                    <tr key={link.id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-500">
                                                {link.url}

                                            </div>
                                        </td>

                                        <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-4 whitespace-nowrap">
                                            <a className="hover:underline" href={process.env.URL_DEV + link.shortUrl}>
                                                {process.env.URL_DEV + link.shortUrl}
                                            </a>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span
                                                className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                                        </td>
                                        

                                        <td
                                            className="px-10 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            {link.clicks}</td>
                                        <td
                                            className="px-16 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            <IoCopyOutline size={20} />
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

