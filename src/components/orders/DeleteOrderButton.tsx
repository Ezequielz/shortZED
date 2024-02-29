'use client'

import { deleteOrder } from "@/action"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5"

interface Props {
    orderId: string
}

export const DeleteOrderButton = ({ orderId }: Props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    if (!orderId) return null


    const handleDelete = async () => {
        const resp = await deleteOrder({orderId})
        if (!resp.ok) {
            setErrorMessage(resp.message)
        }

        router.replace('/links')

    }
    return (
        <span
            onClick={handleDelete}
            className="flex items-center justify-center gap-1 cursor-pointer text-sm font-light bg-red-600 hover:bg-red-500 px-2 py-1 rounded-xl">
            <IoCloseOutline size={20} />
            Eliminar orden

        </span>
    )
}
