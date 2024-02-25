import { TableSkeleton } from ".."

interface Props {
  row?: number

}

export const UserLinksSkeleton = async( { row = 5 }: Props ) => {
 
  
  return (
    <>
  
      <section className="flex flex-col mt-8 ">
        <div className="py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
     
              <TableSkeleton  row={row} />
          </div>
        </div>
      </section>
    </>
  )
}
