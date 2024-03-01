'use client'

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, Plan, PlanName } from '@prisma/client';
import { getAllPlans, getCode, getPlan } from '@/action';
import clsx from 'clsx';
import { useCheckoutStore } from '@/store';
import { currencyFormat, dateFormat } from '@/helpers';

interface FormInputs {
    codeName: string;
};
interface Props {
    link: Link;
}

export const CheckoutForm = ({ link }: Props) => {


    const planName = useCheckoutStore(state => state.plan);
    const changePlan = useCheckoutStore(state => state.changePlan);
    const code = useCheckoutStore(state => state.code);
    const setCode = useCheckoutStore(state => state.setCode);

    const [plan, setPlan] = useState<Plan>();
    const [plans, setPlans] = useState<Plan[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>();

    useEffect(() => {
        const allPlans = async () => {
            return await getAllPlans();
        };

        allPlans().then(res => {
            setPlans(res.plans);
        });
    }, []);


    useEffect(() => {
        if (!link.limit) {
            setIsLoading(false);
            return changePlan(PlanName.super)
        }

        const getPlanDB = async () => {
            return await getPlan(planName);
        };


        getPlanDB().then(res => {
            if (!res.ok) redirect('/links');
            setPlan(res.plan!);
            setIsLoading(false);
        });


    }, [planName, link, changePlan]);


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');

        const { codeName } = data;
        const codeDB = await getCode(codeName);

        if (!codeDB.ok) return setErrorMessage(codeDB.message);

        setCode(codeDB.code!);


    };

    if (isLoading) {
        return <div>Loading...</div>;
    };
   
    const plansFiltered = plans?.filter(p => p.name !== planName && p.name !== 'free')
    if (!link.limit) return <p>El link tiene clicks ilimitados hasta el: {dateFormat(link.expires)}, solo puede activar el pack super para externder el uso 1 mes</p>
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" max-w-[1200px] ">

            {/* CODIGO DESCUENTO */}
            <div className="mb-6 pb-6 border-b border-gray-200 flex justify-around items-center">
                <div className="w-[300px] sm:w-fit  p-2 ">
                    <h2 className='mb-2'>Plan seleccionado</h2>

                    <div className="h-fit flex md:flex-col justify-center items-center border-2 border-violet-600  rounded-lg p-4">
                        <div className="flex flex-col justify-center">

                            <p className="text-green-400 text-lg md:text-xl font-semibold">Plan {plan!.name} </p>
                            <p className="text-green-400 ">{plan!.limit ? `+${plan!.limit} clicks` : 'Sin limite de clicks'}</p>
                        </div>
                        <span className="font-semibold text-3xl md:text-4xl mx-auto mt-2">{currencyFormat(plan!.price)}</span>

                    </div>
                </div>
                <div className=' flex flex-col'>
                    <div className=''>
                        <h4> Elegir otro plan:</h4>
                        <div className='flex justify-between gap-2'>
                            {
                                plansFiltered?.map(p => (
                                    <span
                                        key={p.id}
                                        onClick={() => changePlan(p.name)}
                                        className='w-1/2 border-2 border-violet-600 p-2 rounded-lg cursor-pointer hover:bg-violet-400'
                                    >
                                        {p.name}
                                    </span>

                                ))
                            }

                        </div>
                    </div>


                    {
                        code.name ? (
                            <div className=' flex flex-col items-end '>
                                <div className=" text-yellow-300">
                                    codigo valido: {code.name}
                                </div>
                                <span>descuento: {code.discount}%</span>
                            </div>
                        ) : (
                            <>
                                {
                                    !errorMessage ? (
                                        <div className="-mx-2 flex items-end justify-end">
                                            <div className="flex-grow px-2 lg:max-w-xs">
                                                <label className=" font-semibold text-sm mb-2 ml-1">Código de descuento</label>
                                                <div>

                                                    <input

                                                        className={
                                                            clsx(
                                                                "w-full px-3 py-2 border text-slate-900 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors",
                                                                {
                                                                    'border-red-500': errors.codeName,
                                                                }
                                                            )
                                                        }
                                                        placeholder="XXXXXX"
                                                        type="text"
                                                        {...register("codeName", { required: true, minLength: 3 })}
                                                    />

                                                    {errors.codeName?.type === 'required' && (
                                                        <span className="text-red-500">*Debe introducir un código válido</span>
                                                    )}
                                                    {errors.codeName?.type === 'minLength' && (
                                                        <span className="text-red-500">*El código debe tener al menos 3 caracteres</span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="px-2">
                                                <button
                                                    disabled={isSubmitting}
                                                    className={`${isSubmitting && 'btn-disabled'} block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold`}
                                                >
                                                    Aplicar
                                                </button>
                                            </div>
                                        </div>

                                    ) : (
                                        <div className='flex flex-col'>
                                            <div onClick={() => setErrorMessage('')} className='cursor-pointer'>Reintentar</div>
                                            <span className="text-red-500 flex justify-end ">{errorMessage}</span>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            {/* SUBTOTAL */}
            <div className="mb-6 pb-6 border-b border-gray-200 ">
                <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                        <span className="">Subtotal</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold">{currencyFormat(plan!.price)}</span>
                    </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                        <span className="">impuestos (5%)</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold">{currencyFormat(plan!.price * 0.05)}  </span>
                    </div>
                </div>
                {
                    code.name && (
                        <div className="w-full flex mb-3 items-center text-green-500">
                            <div className="flex-grow">
                                <span className="">decuento: ({code.discount}%)</span>
                            </div>
                            <div className="pl-3">
                                <span className="font-semibold">-{currencyFormat(plan!.price * (code.discount / 100))}  </span>
                            </div>
                        </div>

                    )
                }
            </div>
            {/* TOTAL */}
            <div className="mb-6 pb-6 border-b border-gray-200 sm:border-none  text-xl">
                <div className="w-full flex items-center">
                    <div className="flex-grow">
                        <span className="">Total</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold text-gray-400 text-sm">USD</span> <span className="font-semibold">{currencyFormat(plan!.price + (plan!.price * 0.05) - (code.discount * plan!.price / 100))} </span>
                    </div>
                </div>
            </div>




        </form>
    );
}
