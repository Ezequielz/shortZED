import { getAllUsers } from "@/action"
import { Pagination, TableUsers, UsersItems } from "../.."


interface Props {
    page?: number;
    search?: string
}

export const Users = async ({ page, search }: Props) => {
    const { users, totalPages } = await getAllUsers({ page, search })


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
        <>
            <div className="lg:min-h-[355px] overflow-x-auto">
               <TableUsers users={users} />

            </div>

            <Pagination totalPages={totalPages} />
        </>
    )
}
