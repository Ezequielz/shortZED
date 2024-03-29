'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { IoIosArrowForward } from "react-icons/io";


import { usePathname, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useLinksStore } from '@/store';
import { updateLinkHash } from '@/action';

interface FormInputs {
    hash: string;
};

interface Props {
    url: string;
};

export const UpdateForm = ({ url }: Props) => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormInputs>();
    const path = usePathname();
    const changeRefresh = useLinksStore(state => state.changeRefresh);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { hash } = data;

        // server action
        const resp = await updateLinkHash(url, hash);

        if (!resp.ok) {
            setErrorMessage(resp.message)
            if (resp.shortUrl) {
                router.replace(`${path}?short=${resp.shortUrl}`);

            };

            return;
        };


        if (isSubmitSuccessful) {
            reset();
            router.replace(`${path}?short=${resp.shortUrl}`);
            changeRefresh();
            enqueueSnackbar('Hash actualizado', { variant: "success" });
        };

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" w-fit ">

            <div className='flex flex-col justify-center gap-1'>
                {/* URL */}

                {/* HASH y BUTTON */}
                <div className='  m-auto flex gap-2 justify-center'>
                    {/* HASH */}
                    <input
                        type="text"
                        autoFocus
                        placeholder="hash personalizado"
                        className={
                            clsx(
                                "mt-2 p-1 border rounded-md bg-gray-200 text-slate-800",
                                {
                                    'border-red-500': errors.hash,
                                }
                            )
                        }
                        {...register("hash", { required: true, minLength: 3, maxLength: 10 })}
                    />

                    {/* BUTTON */}
                    <div className="flex justify-center flex-col">

                        <button
                            disabled={isSubmitting}
                            className={
                                clsx(
                                    "inline-flex mt-2 group relative overflow-hidden bg-violet-600 focus:ring-4 focus:ring-blue-300  items-center pl-7 pr-5 py-2.5 rounded-lg text-white justify-center gap-1",
                                    {
                                        'bg-neutral-600': isSubmitting
                                    }

                                )
                            }
                        >

                            <span className={
                                clsx({
                                    'hidden': !isSubmitting,
                                })
                            }>
                                <span className="z-40 animate-pulse">Actualizando...</span>
                            </span>

                            <span className={
                                clsx({
                                    'hidden': isSubmitting,
                                })
                            }>
                                <span className="z-40">Actualizar hash</span>
                            </span>


                            <span className={
                                clsx({
                                    'hidden': isSubmitting,
                                })
                            }>

                                <IoIosArrowForward size={20} className='transition-all duration-300 group-hover:translate-x-1' />

                                <div
                                    className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
                                </div>
                            </span>
                        </button>

                    </div>

                </div>
                <div className='relative'>

                    {errors.hash?.type === 'required' && (
                        <span className="absolute top-0 bg-red-500 text-sm py-0.5 px-2 text-white rounded-lg">*Debe introducir un hash</span>
                    )}
                    {errors.hash?.type === 'minLength' && (
                        <span className="absolute top-0 bg-red-500 text-sm py-0.5 px-2 text-white rounded-lg">*Minimo 3 caracteres</span>
                    )}
                    {errors.hash?.type === 'maxLength' && (
                        <span className="absolute top-0 bg-red-500 text-sm py-0.5 px-2 text-white rounded-lg">*Máximo 10 caracteres</span>
                    )}
                </div>
                <span className="text-red-500 flex items-center ">{errorMessage}</span>

            </div>




        </form >
    )
}
