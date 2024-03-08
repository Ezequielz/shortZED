'use client'
import Image from 'next/image';
import clsx from 'clsx';
import { Role, User } from '@prisma/client';
import { IoPersonOutline } from 'react-icons/io5';
import { StatusSelect } from './StatusSelect';
import { RolesSelect } from './RolesSelect';




interface Props {
    users: User[] | undefined;
};

export const UsersItems = ({ users }: Props) => {
    
    if (!users) return null;

    return (
        <>
            {
                users.map(user => (
                    <tr key={user.id} className={
                        clsx(
                            "text-gray-500",
                            {
                                'bg-green-50 hover:bg-green-100': user.isActive,
                                'bg-red-50 hover:bg-red-100': !user.isActive,
                                'bg-gradient-to-r  from-violet-200 to-green-200 hover:from-violet-300 hover:to-green-300': (user.roles === Role.admin && user.isActive),
                                'bg-gradient-to-r from-violet-200 to-red-200 hover:from-violet-300 hover:to-red-300': (user.roles === Role.admin && !user.isActive),
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

                        <td className=" px-6 py-2.5 text-sm leading-5 text-violet-700 whitespace-no-wrap border-b border-gray-200">
                            <StatusSelect userId={user.id} isActive={user.isActive} />
                        </td>



                        <td className="px-6 py-2.5 text-sm leading-5 text-violet-700 whitespace-no-wrap border-b border-gray-200">
                           <RolesSelect userId={user.id} role={user.roles}/>     

                        </td>

                    </tr>
                ))
            }
        </>
    )
}
