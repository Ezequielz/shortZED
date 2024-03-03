import { LinksSkeleton } from ".."

interface Props {
    items: number[]
    columns: string[]
}

export const TableSkeleton = ({ items, columns }: Props) => {

    return (
        <table className="min-w-full mt-8">
            <thead>
                <tr>
                    {
                        columns.map((column, i) => (

                            <th key={i}
                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                            >
                                {column}
                            </th>
                        ))
                    }


                </tr>
            </thead>
            <tbody className="animate-pulse">
                <LinksSkeleton items={items} />
            </tbody>

        </table>

    )
}
