import { getAllUsers } from "@/action"
import { Pagination, UsersItems } from ".."
import { redirect } from "next/navigation";

interface Props {
    page?: number;
}

export const TableUsers = async({page}: Props) => {
    const {users, totalPages} = await getAllUsers({page})

    if (!users) {
        return (<div>No hay usuarios</div>)
    }

    if (users.length === 0) {
        redirect(`/?page=1`)
    }

    return (
        <>
            <div className="lg:min-h-[355px]">
                <table className="min-w-full ">
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

                            {/*  TODO verificar el email */}
                            {/* <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Email verificado</th> */}
                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Estado</th>

                            <th
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Eliminar</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white">


                        <UsersItems users={users} />
                    </tbody>
                </table>

            </div>

            <Pagination totalPages={totalPages} />
        </>
    )
}
