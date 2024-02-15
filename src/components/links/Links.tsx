import { FaRegCopy, FaRegEdit } from "react-icons/fa";


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


        <section className="max-w-[1200px] my-10 mx-auto">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Url
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Short url
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Clicks
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Copy
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Edit
                        </th>

                    </tr>
                </thead>
                <tbody>


                    {
                        links.map(link => (
                            <tr
                                key={link.id}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            >



                                <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                    {link.url.length > 60 ? link.url.slice(0, 60) + '...' : link.url}
                                </td>
                                <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <a className="hover:underline" href={process.env.URL_DEV + link.shortUrl}>
                                        {process.env.URL_DEV + link.shortUrl}
                                    </a>
                                </td>
                                <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                    {link.clicks}
                                </td>
                                <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                    <FaRegCopy size={20} />
                                </td>
                                <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                    <FaRegEdit size={20} />
                                </td>

                            </tr>

                        ))
                    }

                </tbody>
            </table>


        </section>


    )
}

