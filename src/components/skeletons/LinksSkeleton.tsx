import { StatusLinksSeleton, TableSkeleton } from "..";

interface Props {
  items: number;

};

export const LinksSkeleton = async ({ items = 5 }: Props) => {
  // const itemsArray = Array.from({ length: items }, (_, i) => i + 1)
  const columns = ['Url','Short url','Estado', 'Clicks','Limite','Short','Qr', 'Editar','Eliminiar']
  return (
    <>

      <section className="flex flex-col mt-8 ">
        <div className="py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <StatusLinksSeleton />
            <TableSkeleton items={items} columns={columns} />
          </div>
        </div>
      </section>
    </>
  )
}
