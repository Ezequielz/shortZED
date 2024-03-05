import { User } from "@prisma/client"
import clsx from "clsx"
import Image from "next/image"
import { IoPersonOutline } from "react-icons/io5"
import { RiDeleteBin2Line } from "react-icons/ri"

interface Props {
    users: User[] | undefined
}

export const UsersItems = ({ users }: Props) => {
    if (!users) return null
    return (
        <>
            {
                users.map(user => (
                    <tr key={user.id} className={
                        clsx(
                            "text-gray-500",
                            {
                                'bg-gray-50 hover:bg-gray-100': user.isActive,
                                'bg-red-50 hover:bg-red-100': !user.isActive,
                            }
                        )
                    }>
                        <td className=" px-6 border-b text-gray-500 border-gray-200">

                            {
                                user.image ? (

                                    <Image
                                        src={user.image ?? ''}
                                        alt={`imagen del usuario ${user.name}`}
                                        width={30}
                                        height={30}
                                    />
                                ) : (
                                    <IoPersonOutline size={30} />
                                )
                            }

                        </td>

                        <td className="px-6 py-2.5 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {user.name}
                        </td>

                        <td className="px-6 py-2.5 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {user.email}
                        </td>

                        <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-2.5 whitespace-nowrap">
                            <span
                                className={
                                    clsx(
                                        "inline-flex px-2 text-xs font-semibold leading-5 rounded-full",
                                        {
                                            'bg-green-200 text-green-800': user.isActive,
                                            'bg-red-200 text-red-800': !user.isActive,
                                        }
                                    )
                                }
                            >
                                {user.isActive ? 'Activo' : 'Baneado'}
                            </span>
                        </td>



                        <td
                            // onClick={() => deleteOrder(order.id)}
                            className="px-12 py-2.5 text-sm leading-5 text-red-400 whitespace-no-wrap border-b border-gray-200">
                            <RiDeleteBin2Line size={20} className="cursor-pointer hover:text-red-600 hover:scale-125" />
                        </td>

                    </tr>
                ))
            }
        </>
    )
}
