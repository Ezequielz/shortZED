'use client'

import { StatusSelect } from '@/components/users/StatusSelect';
import { Code } from '@prisma/client';
import clsx from 'clsx';


interface Props {
    codes: Code[];
}
export const CodeItems = ({ codes }: Props) => {


    return (
        <>
            {
                codes.map(code => (
                    <tr key={code.id} className={
                        clsx(
                            "text-gray-500",
                            {
                                'bg-green-50 hover:bg-green-100': code.isActive,
                                'bg-red-50 hover:bg-red-100': !code.isActive,
                            }
                        )
                    }>
                        <td className=" px-6 border-b text-gray-500 border-gray-200">

                            {code.name}
                        </td>

                        <td className="px-6 py-2.5 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {code.discount}
                        </td>
                        {/* TODO implementar select */}
                        <td className=" px-6 py-2.5 text-sm leading-5 text-violet-700 whitespace-no-wrap border-b border-gray-200">
                            <StatusSelect isActive={code.isActive} codeId={code.id} />
                        </td>

                    </tr>
                ))
            }
        </>
    )
}
