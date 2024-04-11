
import { ImBarcode } from "react-icons/im"
import { IoCardOutline, IoLinkOutline, IoPersonOutline } from "react-icons/io5"
import { MdCurrencyExchange, MdDashboardCustomize } from "react-icons/md"
import { BsPaypal } from "react-icons/bs";
import { AdminMenuList } from ".."


const menu = [
    {
        href: '/admin/dashboard',
        icon: <MdDashboardCustomize size={30} />,
        label: 'Dashboard',
        color: 'bg-gradient-to-tr from-violet-600 to-violet-400 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/40 active:opacity-[0.85]' 
    },
    {
        href: '/admin/users',
        icon: <IoPersonOutline size={30} />,
        label: 'Usuarios',
        color: 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' 
    },
    {
        href: '/admin/links',
        icon: <IoLinkOutline size={30} />,
        label: 'Links',
        color: 'bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85]' 
    },
    {
        href: '/admin/orders',
        icon: <IoCardOutline size={30} />,
        label: 'Orders',
        color: 'bg-gradient-to-tr from-amber-600 to-amber-400 text-white shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/40 active:opacity-[0.85]' 
    },
    {
        href: '/admin/plans',
        icon: <MdCurrencyExchange size={30} />,
        label: 'Planes',
        color: 'bg-gradient-to-tr from-rose-600 to-rose-400 text-white shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/40 active:opacity-[0.85]' 
    },
    {
        href: '/admin/codes',
        icon: <ImBarcode size={30} />,
        label: 'Códigos',
        color: 'bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 text-white shadow-md shadow-fuchsia-500/20 hover:shadow-lg hover:shadow-fuchsia-500/40 active:opacity-[0.85]' 
    },
    {
        href: '/admin/paypal',
        icon: <BsPaypal size={30} />,
        label: 'Paypal',
        color: 'bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/40 active:opacity-[0.85]' 
    },
]

export const AdminAside = () => {


    return (
        <aside className="bg-neutral-800/50 hidden fixed inset-0 mt-16 z-0 h-full xl:block  xl:w-44 2xl:w-72 ">
            <div className="m-4">
                <ul className="mb-4 flex flex-col justify-start items-start gap-1">
                    {
                        menu.map(({ label, href, icon, color }) => (
                            <li  key={label} className=" w-full">
                                <AdminMenuList label={label} href={href} icon={icon} color={color} />
                            </li>
                        ))
                    }
                 
                </ul>

            </div>
        </aside>
    )
}
