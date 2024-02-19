
interface Props {
    quantity: number

}

export const LinkSkeleton = ( { quantity }: Props ) => {
    const links = Array(quantity).fill(0)
    return (
        <tbody className="animate-pulse">
            {links.map((link, i) => (
                <tr key={i}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-5"></div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-5"></div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-5"></div>
                    </td>
                </tr>
            ))}

        </tbody>
    )
}
