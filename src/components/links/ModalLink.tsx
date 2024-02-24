

import { getLink } from "@/action"
import { Dialog, Pricing, UpdateForm } from ".."
import { auth } from "@/auth.config"


interface Props {
    short: string
}


export const ModalLink = async ({ short }: Props) => {

    const session = await auth()
    const { ok, links } = await getLink(short, session?.user?.id)


    if (!ok) return null

    const { url, clicks, shortUrl, limit} = links![0]

    const object = {
        Url: url,
        Hash: shortUrl,
        Clicks: clicks,
        Limite: limit <= 10 ? limit + ' ' + 'Gratis!' : limit,
    }
   

    return (

        <Dialog >
            <div className="flex flex-col justify-center items-center p-2 rounded-lg">
                <h1 className="text-2xl font-bold">Editar Link</h1>

                <ul className="w-full ">
                    {
                      Object.entries(object).map(([prop, value]) => (
                        <li key={prop} className="p-2 flex justify-between odd:bg-neutral-600 even:bg-neutral-500">
                            <span>{prop}:</span>
                            <span>{value}</span>
                        </li>
                      ))
                    }

                </ul>

                <UpdateForm url={links![0].url} />
                <h1 className="text-2xl font-bold p-4">Precios</h1>
                <Pricing />
            </div>
        </Dialog>
    )
}
