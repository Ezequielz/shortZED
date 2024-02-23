
import { getLink } from "@/action"
import { Dialog, SingleLink, UpdateForm } from ".."
import { auth } from "@/auth.config"

interface Props {
    short: string
}


export const ModalLink = async({short}:Props) => {

    const session = await auth();
    //TODO search params
    const  res  = await getLink(short, session?.user?.id)
    console.log(short)
        console.log(res)
    // if(!res.ok) return null

    return (
        
        <Dialog >
            <UpdateForm url={''}  /> 
        </Dialog>
    )
}
