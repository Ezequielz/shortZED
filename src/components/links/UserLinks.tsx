import { getUserLinks } from "@/action"



export const UserLinks = async() => {
    //TODO modificar el usuario
    const user = '7693c179-a16d-4ade-bc3c-42b6840a0c99'
    const { links = [] } = await getUserLinks(user)
  

    if (!links) {
        return <div>Loading...</div>
    }


return (
  

        <section className="max-w-[1200px] my-10 mx-auto">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            url
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            shortUrl
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
                                    { link.url }
                                </td>
                                <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <a href={process.env.URL_DEV + link.shortUrl}>
                                        { process.env.URL_DEV + link.shortUrl }
                                    </a>
                                </td>

                            </tr>

                        ))
                    }

                </tbody>
            </table>


        </section>

    
)
}

