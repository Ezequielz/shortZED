import { Code } from "@prisma/client";
import { CodeItems } from "./CodeItems";


interface Props {
    codes: Code[];
}


export const TableCodes = ({ codes }: Props) => {
    return (
        <table className="min-w-full ">
            <thead>
                <tr>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Descuento</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Estado</th>
                   
                </tr>
            </thead>
            <tbody className="bg-white">


                <CodeItems codes={codes} />
            </tbody>
        </table>
    )
}
