import { LinkSkeleton } from ".."


export const UserLinksSkeleton = async() => {
 
  
  return (
    <>
      <section className="flex flex-wrap -mx-6 animate-pulse">
        <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div className="p-3 rounded-full"></div>
            <div className="mx-5">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
            </div>
          </div>
        </div>
        <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
          <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div className="p-3 rounded-full"></div>
            <div className="mx-5">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
            </div>
          </div>
        </div>
        <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div className="p-3 rounded-full"></div>
            <div className="mx-5">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col mt-8 ">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Url</th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Short Url</th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Estado</th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Clicks</th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Limite</th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Copiar Short</th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Editar</th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Eliminar</th>

                </tr>
              </thead>
              <LinkSkeleton  quantity={5} />
        
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
