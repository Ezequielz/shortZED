import { getAllCodes, getAllLinks, getAllOrders, getAllPlans, getAllUsers } from "@/action";
import Link from "next/link";
import { ImBarcode } from "react-icons/im";
import { IoCardOutline, IoLinkOutline, IoPersonOutline } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";

export default async function () {
 
  const [usersDB, linksDB, OrdersDB, plansDB, codesDB] = await Promise.all([
    getAllUsers({}),
    getAllLinks({}),
    getAllOrders({}),
    getAllPlans(),
    getAllCodes({})
  ]);

  const { totalCount, usersRoleCount, adminsRoleCount, usersActive, usersInactive } = usersDB
  const { totalLinkCount, totalLinkActive, totalLinkInactive } = linksDB
  const { totalOrderCount, totalOrdersPaid, totalOrdersNotPaid } = OrdersDB
  const { totalPlansCount } = plansDB
  const { totalCodesCount,totalCodesActive,totalCodesInactive } = codesDB

  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">

      <div className="p-6 grid gap-10 md:grid-cols-2 xl:grid-cols-3 ">
        <Link
          href={'/admin/users'}
          className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 hover:text-white"
        >
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <IoPersonOutline size={30} />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de usuarios</p>
            <h3 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug ">{totalCount}</h3>
          </div>
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

        <Link
          href={'/admin/links'}
          className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-green-600 hover:to-green-400 hover:text-white"
        >
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <IoLinkOutline size={30} />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de Links</p>
            <h3 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug ">{totalLinkCount}</h3>
          </div>
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

        <Link
          href={'/admin/orders'}
          className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-amber-600 hover:to-amber-400 hover:text-white"
        >
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-600 to-amber-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <IoCardOutline size={30} />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de Ordenes</p>
            <h3 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug ">{totalOrderCount}</h3>
          </div>
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
                  Pagadas: {totalOrdersPaid}
                </li>
                <li>
                  Pendientes: {totalOrdersNotPaid}
                </li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          href={'/admin/plain'}
          className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-rose-600 hover:to-rose-400 hover:text-white"
        >
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-rose-600 to-rose-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <MdCurrencyExchange size={30} />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de Planes</p>
            <h3 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug ">{totalPlansCount}</h3>
          </div>
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

        <Link
          href={'/admin/codes'}
          className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-fuchsia-600 hover:to-fuchsia-400 hover:text-white"
        >
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <ImBarcode size={30} />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de codigos</p>
            <h3 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug ">{totalCodesCount}</h3>
          </div>
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
                  Activos: {totalCodesActive}
                </li>
                <li>
                  Inactivos: {totalCodesInactive}
                </li>
              </ul>
            </div>
          </div>
        </Link>


      </div>

    </div>
  );
}