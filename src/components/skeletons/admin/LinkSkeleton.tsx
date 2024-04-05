import { TableSkeleton } from "../TableSkeleton"

export const LinkSkeleton = () => {
  return (
    <div className="p-2">
        <div className="animate-pulse flex gap-2 h-14 bg-gradient-to-tr from-green-600 to-green-400 w-full rounded-xl " />
           
        <TableSkeleton columns={['Url', 'Short url', 'Estado', 'clicks','Limite','Short', 'QR','Editar','Eliminar']} items={5}/>
    </div>
  )
}
