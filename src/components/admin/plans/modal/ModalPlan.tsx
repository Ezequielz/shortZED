

import { Dialog, ModalCloseBtn } from '@/components';
import { Suspense } from 'react';
import { ModalPlanInfo } from './ModalPlanInfo';
import { PlanName } from '@prisma/client';


interface Props {
    planName: PlanName;
    children?: React.ReactNode;
};


export const ModalPlan = async ({ planName, children }: Props) => {

    if (!planName) return null;

    return (

        <Dialog >
            <div className="flex flex-col justify-center items-center p-2 rounded-lg min-w-72">
                <h3 className="text-2xl font-bold">Editar Plan <strong className='capitalize'>{planName}</strong> </h3>
                <ModalCloseBtn />
                {/* TODO implementar skeleton modal */}
                <Suspense fallback={ <div>Cargando modal...</div> } >
                  
                    <ModalPlanInfo planName={planName}/>
                    {children}

                </Suspense>
            </div>
        </Dialog>
    )
}
