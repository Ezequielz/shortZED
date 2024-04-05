import { TableSkeleton } from "../TableSkeleton"

export const OrderSkeleton = () => {
  return (
    <div className="p-2">
        <div className="animate-pulse flex gap-2 h-14 bg-gradient-to-tr from-amber-600 to-amber-400 w-full rounded-xl " />
           
        <TableSkeleton columns={['Orden', 'Estado', 'Link', 'Plan','Limite Final','Precio Total', 'Ver Orden','Eliminar']} items={5}/>
    </div>
  )
}
