import { TableSkeleton } from "../TableSkeleton"

export const PlanSkeleton = () => {
  return (
    <div className="p-2">
           
        <TableSkeleton columns={['Nombre', 'Precio', 'Limite', 'Editar']} items={4}/>
    </div>
  )
}
