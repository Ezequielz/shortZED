import { TableSkeleton } from "../TableSkeleton"

export const UserSkeleton = () => {
  return (
    <div>
        <div className="animate-pulse flex gap-2 w-full">
            <div className="h-24 bg-gradient-to-tr from-blue-600 to-blue-400 w-3/4 rounded-xl"/>
            <div className="h-24 bg-gradient-to-tr from-blue-600 to-blue-400 w-1/4 rounded-xl"/>

        </div>
        <TableSkeleton columns={['Imagen', 'Nombre', 'Email', 'Estado', 'Rol']} items={5}/>
    </div>
  )
}
