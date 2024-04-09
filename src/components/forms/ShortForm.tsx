'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';
import { IoIosArrowForward } from 'react-icons/io';

import { setLink } from '@/action';

interface FormInputs {
    url: string;
    hash?: string
};

export const ShortForm = () => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>();
    const path = usePathname();

    const regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { url, hash } = data;

        // server action
        const resp = await setLink(url, hash);
        reset()
        if (!resp.ok) {
            setErrorMessage(resp.message)
            if (resp.shortUrl) {
                router.replace(`${path}?short=${resp.shortUrl}`)

            }
            enqueueSnackbar('Hubo un error al acortar el link', { variant: "error" });
            return;
        };
        enqueueSnackbar('Link acortado correctamente', { variant: "success" });
        router.replace(`${path}?short=${resp.shortUrl}`);

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" max-w-[1200px] mb-6 z-20">

            <div className='flex flex-col justify-start gap-1'>
                {/* URL */}
                <div className='w-full relative'>
                    {errors.url?.type === 'required' && (
                        <span className="text-red-500 absolute -top-6 left-1">*El url es obligatorio</span>
                    )}
                    {errors.url?.type === 'pattern' && (
                        <span className="text-red-500 absolute -top-6 left-1">*Debe ser un url válido</span>
                    )}
                    <label htmlFor="url">Inserte enlace</label>
                    <input
                        type="text"
                        id='url'
                        autoFocus
                        placeholder="ej: https://mipaginaweb.com/prod/detail?q=pantalon-jean-azul-simple&t=40..etc"
                        className={
                            clsx(
                                "w-full p-2 border rounded-md bg-gray-200 text-slate-800",
                                {
                                    'border-red-500': errors.url,
                                }
                            )
                        }
                        {...register("url", { required: true, pattern: regexURL })}
                    />



                </div>
                {/* HASH y BUTTON */}
                <div className='w-3/4   flex gap-2 '>
                    {/* HASH */}
                    <div className='flex flex-col'>

                        <label htmlFor="hash">Inserte hash personalizado</label>
                        <input
                            type="text"
                            id='hash'
                            autoFocus
                            placeholder="ej: jean"
                            className={
                                clsx(
                                    " p-2 border rounded-md bg-gray-200 text-slate-800",
                                    {
                                        'border-red-500': errors.url,
                                    }
                                )
                            }
                            {...register("hash", { minLength: 3 })}
                        />
                    </div>



                </div>
                {/* BUTTON */}
                <div className="flex justify-center flex-col">

                    <button
                        disabled={isSubmitting}
                        className={`${isSubmitting && 'btn-disabled'} inline-flex mt-2 group relative overflow-hidden bg-violet-600 focus:ring-4 focus:ring-blue-300  items-center pl-7 pr-5 py-2.5 rounded-lg text-white justify-center gap-1 w-fit`}>

                        <span className="z-5">{isSubmitting ? 'Acortando...' : 'Acortar url'}</span>
                        <IoIosArrowForward size={20} className='transition-all duration-300 group-hover:translate-x-1' />

                        <div
                            className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
                        </div>
                    </button>

                </div>
                <div className='relative flex justify-center'>
                    {errors.hash?.type === 'minLength' && (
                        <span className="text-red-500 absolute ">*Debe tener al menos 3 caracteres</span>
                    )}

                </div>

                <div className='relative flex justify-center p-1 mb-1'>
                    <span className="text-red-500  m-auto items-center absolute">{errorMessage}</span>
                </div>

            </div>




        </form>
    )
}
