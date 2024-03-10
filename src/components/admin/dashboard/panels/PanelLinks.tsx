import Link from 'next/link'
import { IoLinkOutline } from 'react-icons/io5'
import { getAllLinks } from '@/action'
import { Suspense } from 'react';
import { TopInfo } from '.';

export const PanelLinks = async () => {
    const { totalLinkCount, totalLinkActive, totalLinkInactive } = await getAllLinks({});
    return (
        <Link
            href={'/admin/links'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-green-600 hover:to-green-400 hover:text-white"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <IoLinkOutline size={30} />
            </div>
            <TopInfo label='links' totalCount={totalLinkCount} />
            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">
                <div className="flex flex-col items-center" >
                    {/* <h4 className="font-normal">Roles</h4>
    <ul>
      <li>
        Usuarios: {usersRoleCount}
      </li>
      <li>
        Admins: {adminsRoleCount}
      </li>
    </ul> */}
                </div>

                <div className="flex flex-col items-center">
                    <h4 className="font-normal">Estado</h4>
                    <ul>
                        <li>
                            Activos: {totalLinkActive}
                        </li>
                        <li>
                            Inactivos: {totalLinkInactive}
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}
