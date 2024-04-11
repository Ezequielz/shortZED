import { Suspense } from 'react'
import { PlanName } from '@prisma/client';
import { getAllPlans } from '@/action'
import { TablePlans } from './TablePlans'
import { ModalLink, ModalOptionsAdminPlans, ModalPlan } from '@/components'

interface Props {
    plan: PlanName;
}
export const Plans = async ({ plan }: Props) => {
    const { plans } = await getAllPlans()

    if (!plans) {
        return (<div>No hay planes</div>)
    }

    if (plans.length === 0) {
        return (
            <div>
                <span>
                    No hay resultados
                </span>
            </div>
        )
    }

    return (
        <>
            <Suspense fallback={<div>Cargando modal...</div>}>
                <ModalPlan planName={plan} >
                    <ModalOptionsAdminPlans planName={plan} />
                </ModalPlan>
            </Suspense>
            <div className="lg:min-h-[355px]  overflow-x-auto">
                <TablePlans plans={plans} />
            </div>
        </>
    )
}
