import { redirect } from "next/navigation";
import { getUserLinks } from "@/action";
import { auth } from "@/auth.config";
import { Links } from "@/components";
import { IoCheckmarkOutline, IoAddOutline, IoLinkOutline, IoWarningOutline  } from 'react-icons/io5';



export default async function LinksPage() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const userId = session.user!.id!

  const { links = [] } = await getUserLinks(session?.user?.id!)
  if (!links) {
    return <div>Loading...</div>
  }

  if (links.length === 0) {
    return (
      <div>No tiene ningún acortador creado</div>
    )
  }

  return (

    <div className="container px-6 py-8 mx-auto">
      <h3 className="text-3xl font-medium text-gray-700">Links</h3>

      <div className="mt-4">

        <div className="flex flex-wrap -mx-6">
          {/* ACTIVE */}
          <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div className="p-3 bg-green-600 bg-opacity-75 rounded-full">
                <IoCheckmarkOutline size={30} />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{links.reduce( (acc, link) => acc + (link.isActive ? 1 : 0), 0 )}</h4>
                <div className="text-gray-500">{links.length === 1 ? 'Activo' : 'Activos'}</div>
              </div>
            </div>
          </div>
          {/* INACTIVE  */}
          <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div className="p-3 bg-yellow-600 bg-opacity-75 rounded-full">
                <IoWarningOutline size={30} />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{links.reduce( (acc, link) => acc + (!link.isActive ? 1 : 0), 0 )}</h4>
                <div className="text-gray-500">Sin activar</div>
              </div>
            </div>
          </div>
          {/* TOTAL CREADOS */}
          <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                <IoLinkOutline size={30} />
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{links.length}</h4>
                <div className="text-gray-500">Total creados</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8">

      </div>

      {/* LINKS */}
      <Links userId={userId}/>


    </div>

  )
}