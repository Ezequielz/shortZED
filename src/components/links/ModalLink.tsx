

import { getLink } from "@/action"
import { Dialog, UpdateForm } from ".."
import { auth } from "@/auth.config"


interface Props {
    short: string
}


export const ModalLink = async({short}:Props) => {

    const session = await auth()
    const {ok, links} = await getLink(short, session?.user?.id)

    if (!ok) return null

    return (
        
        <Dialog >
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Editar Link</h1>
                <p className="text-sm"> <span className="text-green-200">-</span> {links![0].url}</p>
                <p className="text-sm"> hash actual: {links![0].shortUrl} </p>
                <UpdateForm url={links![0].url}  /> 
                <p className="text-sm"> Limite actual: {links![0].limit} </p>
            </div>
        </Dialog>
    )
}
