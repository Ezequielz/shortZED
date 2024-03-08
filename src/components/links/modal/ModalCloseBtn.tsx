'use client'

import { useUIStore } from "@/store"
import { IoClose } from "react-icons/io5"

export const ModalCloseBtn = () => {
    const closeDialog = useUIStore(state => state.closeDialog)
    return (
        <IoClose
            onClick={closeDialog}
            className="absolute top-2 right-2 cursor-pointer hover:bg-neutral-600 hover:rounded-full"
            size={30}
        />
    )
}
