'use client'
import { MdOutlineEditCalendar } from 'react-icons/md';
import { Plan } from '@prisma/client';
import { useUIStore } from '@/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    plans: Plan[];
}
export const PlanItems = ({ plans }: Props) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const openDialog = useUIStore(state => state.openDialog);
    // const closeDialog = useUIStore(state => state.closeDialog);

    const handleOpenDialog = (e: React.MouseEvent<HTMLElement>, plan: Plan) => {
        openDialog();
        // changeRefresh();
        router.replace(`${createPlanUrl(plan.name)}`);
    };

    const createPlanUrl = (plan: string) => {

        const params = new URLSearchParams(searchParams);

        params.set('plan', plan.toString());

        return `${pathName}?${params.toString()}`;

    }

    return (
        <>
            {
                plans.map(plan => (
                    <tr key={plan.id} >
                        <td className=" px-6 border-b text-gray-500 border-gray-200">

                            {plan.name}
                        </td>

                        <td className="px-6 py-2.5 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {plan.price}
                        </td>

                        <td className="px-6 py-2.5 whitespace-no-wrap text-gray-500 border-b border-gray-200">
                            {plan.limit ? plan.limit : 'Sin límite'}
                        </td>
                        <td
                            onClick={(e) => handleOpenDialog(e, plan)}
                            className="px-6 py-3 text-sm leading-5 text-blue-400 whitespace-no-wrap border-b border-gray-200">
                            <MdOutlineEditCalendar size={20} className="cursor-pointer hover:text-blue-600 hover:scale-125" />
                        </td>
                    </tr>
                ))
            }
        </>
    )
}
