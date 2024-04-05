'use client'

import { deleteOrder, getOrderById } from "@/action"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"

interface Props {
    id: string
}

export const DeleteOrderButton = ({ id }: Props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [orderId, setOrderId] = useState('')
    const router = useRouter();

    useEffect(() => {
        const getOrderId = async() => {
           return await getOrderById(id)
        }
        getOrderId().then(order => {
            if( {order} && !order.order?.isPaid){
                setOrderId(order.order?.id ?? '' )
            }
            setIsLoading(false)
        })
      
    }, [id])

    if (isLoading) return null
   
    if (!orderId) return null

    const handleDelete = async () => {
        const resp = await deleteOrder(orderId)
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
