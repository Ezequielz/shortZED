import { Plan } from '@prisma/client';
import { PlanItems } from './PlanItems';

interface Props {
    plans: Plan[];
}


export const TablePlans = ({ plans }: Props) => {


    return (
        <table className="min-w-full ">
            <thead>
                <tr>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Precio</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Limite</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Editar</th>
                </tr>
            </thead>
            <tbody className="bg-white">


                <PlanItems plans={plans} />
            </tbody>
        </table>
    )
}
