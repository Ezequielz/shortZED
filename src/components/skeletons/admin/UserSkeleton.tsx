import { TableSkeleton } from "../TableSkeleton"

export const UserSkeleton = () => {
  return (
    <div>
        <div className="animate-pulse flex flex-col md:flex-row gap-2 w-full">
            <div className="h-24 bg-gradient-to-tr from-blue-600 to-blue-400  md:w-3/4 rounded-xl"/>
            <div className="h-24 bg-gradient-to-tr from-blue-600 to-blue-400 md:w-1/4 rounded-xl"/>

        </div>
        <TableSkeleton columns={['Imagen', 'Nombre', 'Email', 'Estado', 'Rol']} items={5}/>
    </div>
  )
}
