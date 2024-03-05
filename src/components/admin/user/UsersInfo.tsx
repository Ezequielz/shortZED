import { getAllUsers } from "@/action"

interface Props {
    children: React.ReactNode
}

export const UsersInfo = async({ children }: Props) => {
    const { totalCount, usersActive, usersInactive, usersRoleCount, adminsRoleCount } = await getAllUsers({})
    return (
        <div className="flex flex-col justify-between items-center max-w-md mx-auto bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg m-2 p-2">
            <div>
                <span> Total de usuarios: {totalCount}</span>
                <div className="flex flex-row justify-between gap-3">
                    <div className="flex flex-col">
                        <span>
                            activos: {usersActive}

                        </span>
                        <span>
                            inactivos: {usersInactive}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span>
                           admin: {adminsRoleCount}

                        </span>
                        <span>
                            Usuarios : {usersRoleCount}
                        </span>
                    </div>

                </div>


            </div>

            {children}

        </div>
    )
}
