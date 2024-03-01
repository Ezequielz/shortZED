

import { getLink } from "@/action"
import { Dialog, Pricing, UpdateForm } from ".."
import { auth } from "@/auth.config"
import { ModalCloseBtn } from "./ModalCloseBtn"

interface Props {
    short: string
}


export const ModalLink = async ({ short }: Props) => {

    if (!short) return null
    const { ok, links } = await getLink(short)

    if (!ok) return null

    const { url, clicks, shortUrl, limit } = links![0]

    const object = {
        Url: url,
        Hash: process.env.NEXT_PUBLIC_URL_DEV + shortUrl,
        Clicks: clicks,
        Limite: !limit ?  '∞' : (limit > 10 ? limit : limit + ' Gratis'),

    }


    return (

        <Dialog >
            <div className="flex flex-col justify-center items-center p-2 rounded-lg">
                <h3 className="text-2xl font-bold">Editar Link</h3>
                <ModalCloseBtn />

                <ul className="w-full ">
                    {
                        Object.entries(object).map(([prop, value]) => (
                            <li key={prop} className="p-2 flex justify-between odd:bg-neutral-600 even:bg-neutral-500">
                                <span>{prop}:</span>
                                {
                                  typeof(value) === 'string' && value.length > 30 ? (

                                        <span className="w-[350px] break-words text-xs text-right">{value.length > 150 ? value.slice(0,150) + '...' : value}</span>
                                    ) : (

                                        <span className="">{value}</span>
                                    )
                                }
                            </li>
                        ))
                    }

                </ul>

                <UpdateForm url={links![0].url} />
                <h1 className="text-2xl font-bold p-4">Precios</h1>
                <Pricing short={short} />
            </div>
        </Dialog>
    )
}
