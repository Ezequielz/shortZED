
interface Props {
    items: number
    columns: string[]
}

export const TableSkeleton = ({ items, columns }: Props) => {
     const itemsArray = Array.from({ length: items }, (_, i) => i + 1)

    return (
        <table className="min-w-full mt-8 ">
            <thead className="">
                <tr className=" ">
                    {
                        columns.map((column, i) => (

                            <th key={i}
                                className="px-6  py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase  border-gray-200 bg-gray-50"
                            >
                                {column}s
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="">
                {
                    itemsArray.map((item, i) => (

                        <tr key={i}
                            className=" text-left text-gray-500  border-b border-gray-200 bg-gray-50"
                        >

                            {columns.map((column, i) => (
                                <td key={i} className="animate-pulse p-3 text-gray-500    border-gray-200 bg-gray-50">
                                     <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>

        </table>


    )
}
