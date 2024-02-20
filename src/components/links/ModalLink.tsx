
import { getLink } from "@/action"
import { Dialog, SingleLink } from ".."

interface Props {
    modalSlug: string
}

export const ModalLink = ({modalSlug}:Props) => {

  
    return (
        
        <Dialog >
            <SingleLink short={modalSlug} />
        </Dialog>
    )
}
