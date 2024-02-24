

import { getLink } from "@/action"
import { Dialog, UpdateForm } from ".."
import { auth } from "@/auth.config"


interface Props {
    short: string
}


export const ModalLink = async ({ short }: Props) => {

    const session = await auth()
    const { ok, links } = await getLink(short, session?.user?.id)


    if (!ok) return null

    const { id, userId, user,createdAt, ...rest } = links![0]
    console.log(rest)

    return (

        <Dialog >
            <div className="flex flex-col justify-center items-center p-2 rounded-lg">
                <h1 className="text-2xl font-bold">Editar Link</h1>

                <ul className="w-full">
                    {
                      Object.entries(rest).map(([prop, value]) => (
                        <li key={prop} className="flex justify-between">
                            <span>{prop}</span>
                            <span>{value}</span>
                        </li>
                      ))
                    }

                </ul>

                <UpdateForm url={links![0].url} />

            </div>
        </Dialog>
    )
}
