'use client'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { PlanName } from '@prisma/client';
import { getPlanByName, updatePlanByAdmin } from '@/action';
import { useUIStore } from '@/store';
import { ModalPlansSkeleton } from '@/components';

interface Props {
    planName: PlanName;
};

interface FormInputs {
    price: number;
    limit: number | null;
};


export const ModalOptionsAdminPlans = ({ planName }: Props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [plan, setPlan] = useState<FormInputs>();
    const closeDialog = useUIStore(state => state.closeDialog)
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<FormInputs>();

    useEffect(() => {
        const getPlan = async () => {
            const { plan } = await getPlanByName(planName);
            return plan!;
        };

        getPlan().then(res => {

            const { id, ...rest } = res;
            setPlan(rest);
            setIsLoading(false);
        });

    }, [planName]);

    useEffect(() => {

        if (plan) {
            setValue('price', plan.price ? plan.price : 0);
            setValue('limit', plan.limit ? plan.limit : 0);

        };

    }, [setValue, plan]);




    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { price, limit } = data;

        if (price === plan?.price && limit === plan.limit) {
            enqueueSnackbar('No se han realizado cambios los valores son iguales', { variant: "info" });
            closeDialog();
            return;
        };

        const { ok, message } = await updatePlanByAdmin({price, limit}, planName);

        if (!ok) {
            enqueueSnackbar(message, { variant: "error" });
            setErrorMessage(message);
            return;
        };

        enqueueSnackbar(`Plan ${planName} actualizado`, { variant: "success" });
        closeDialog();
        
    };

    if (isLoading) {
        return (
            <ModalPlansSkeleton />
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-neutral-900 p-4 m-2 max-w-[1200px] mb-6 flex flex-col gap-2 items-center justify-center">

            <div className='flex flex-row gap-2 items-center justify-center'>
                <div className='flex flex-col gap-2 '>
                    {errors.price?.type === 'required' && (
                        <span className="text-red-500">*El precio es obligatorio</span>
                    )}
                    {errors.price?.type === 'min' && (
                        <span className="text-red-500">*El precio minimo es 0</span>
                    )}
                    <input
                        type="number"
                        className='p-2 rounded-md'
                        min={0}
                        {...register('price', { required: true, min: 0 })}
                    />
                    <input
                        type="number"
                        className='p-2 rounded-md'
                        min={0}
                        {...register('limit', { required: true, min: 0 })}
                    />
                    {errors.limit?.type === 'required' && (
                        <span className="text-red-500">*El límite es obligatorio</span>
                    )}
                    {errors.limit?.type === 'min' && (
                        <span className="text-red-500">*El límite minimo es 0</span>
                    )}
                    <span className="text-red-500">{errorMessage}</span>

                    <span className="text-amber-500">0 = Plan gratuito / límite infinitos</span>
                </div>

            </div>
            <button className='p-2 bg-violet-600 m-2 rounded-md hover:bg-violet-700 text-slate-100'>
                Guardar
            </button>

        </form>
    )
}
