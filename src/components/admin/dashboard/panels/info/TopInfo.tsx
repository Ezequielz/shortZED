

interface Props {
    label: string;
    totalCount: number | undefined;
}

export const TopInfo = ({label, totalCount}: Props) => {
    return (
        <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de {label}</p>
            <h3 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug ">{totalCount}</h3>
        </div>
    )
}
