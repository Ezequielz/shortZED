'use client'

import { Code} from '@prisma/client';


interface Props {
    codes: Code[];
}
export const CodeItems = ({ codes }: Props) => {

 
    return (
        <>
            {
                codes.map(code => (
                    <tr key={code.id} >
                        <td className=" px-6 border-b text-gray-500 border-gray-200">

                            {code.name}
                        </td>

                        <td className="px-6 py-2.5 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {code.discount}
                        </td>
                        {/* TODO implementar select */}
                        <td className="px-6 py-2.5 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {code.isActive ? 'Activo' : 'Inactivo'}
                        </td>
                  
                    </tr>
                ))
            }
        </>
    )
}
