import Link from 'next/link';
import { MdCurrencyExchange } from 'react-icons/md';
import { getAllPlans } from '@/action';
import { TopInfo } from '.';

export const PanelPlans = async() => {

    const { totalPlansCount } = await getAllPlans();
    return (
        <Link
            href={'/admin/plans'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-rose-600 hover:to-rose-400 hover:text-white"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-rose-600 to-rose-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <MdCurrencyExchange size={30} />
            </div>
            <TopInfo label='planes' totalCount={totalPlansCount} />
            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">
                <span>Sin variantes</span>
                {/* <div className="flex flex-col items-center" >
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
            </div> */}
            </div>
        </Link>
    )
}
