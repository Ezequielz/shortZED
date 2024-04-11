
import { UsersItems } from '..';
import { type User } from '@prisma/client';


interface Props {
    users: User[];
}

export const TableUsers = async ({ users }: Props) => {
    


    if (!users) {
        return (<div>No hay usuarios</div>)
    }

    if (users.length === 0) {
        return (
            <div>
                <span>
                    No hay resultados
                </span>
            </div>
        )
    }

    return (
        <table className="min-w-full  ">
            <thead>
                <tr>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Imagen</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Email</th>

                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Estado</th>

                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Rol</th>

                </tr>
            </thead>
            <tbody className="bg-white">


                <UsersItems users={users} />
            </tbody>
        </table>
    )
}
