import { TableSkeleton } from "../TableSkeleton"

export const CodesSkeleton = () => {
  return (
    <div>
        <div className="animate-pulse flex gap-2 w-full">
            <div className="h-24 bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 w-3/4 rounded-xl"/>
            <div className="h-24 bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 w-1/4 rounded-xl"/>

        </div>
        <TableSkeleton columns={['Nombre', 'Descuento', 'Estado']} items={5}/>
    </div>
  )
}
