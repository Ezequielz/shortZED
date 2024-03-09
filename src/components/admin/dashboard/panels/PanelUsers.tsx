import Link from 'next/link'
import { IoPersonOutline } from 'react-icons/io5'
import { getAllUsers } from '@/action'
import { TopInfo } from '.'

export const PanelUsers = async () => {

    const { totalCount, usersRoleCount, adminsRoleCount, usersActive, usersInactive } = await getAllUsers({})
    return (
        <Link
            href={'/admin/users'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 hover:text-white"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <IoPersonOutline size={30} />
            </div>
            <TopInfo label='usuarios' totalCount={totalCount} />
            
            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">
                <div className="flex flex-col items-center" >
                    <h4 className="font-normal">Roles</h4>
                    <ul>
                        <li>
                            Usuarios: {usersRoleCount}
                        </li>
                        <li>
                            Admins: {adminsRoleCount}
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-center">
                    <h4 className="font-normal">Estado</h4>
                    <ul>
                        <li>
                            Activos: {usersActive}
                        </li>
                        <li>
                            Baneados: {usersInactive}
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}
