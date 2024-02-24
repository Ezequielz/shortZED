'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { IoIosArrowForward } from "react-icons/io";


import { updateUrl } from '@/action';
import { usePathname, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

interface FormInputs {
    hash: string
};

interface Props {
    url: string
}

export const UpdateForm = ({url}: Props) => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting,isSubmitSuccessful }, reset} = useForm<FormInputs>();
    const path = usePathname();


    const session = useSession();
    const userId = session.data?.user?.id;

    if (!userId) return null


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { hash } = data;

        // server action
        const resp = await updateUrl( url, userId, hash);
        
        if (!resp.ok) {
            setErrorMessage(resp.message)
            if( resp.shortUrl ) {
                router.replace(`${path}?short=${resp.shortUrl}`)
            
            }
            return;
        };
   
        
        if (isSubmitSuccessful) {
            reset()
            router.replace(`${path}?short=${resp.shortUrl}`)
            enqueueSnackbar('Hash actualizado', { variant: "success" })
        }

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
                        {...register("hash")}
                    />
                    {/* BUTTON */}
                    <div className="flex justify-center flex-col">

                        <button
                            disabled={isSubmitting}
                            className={`${isSubmitting && 'btn-disabled'} inline-flex mt-2 group relative overflow-hidden bg-violet-600 focus:ring-4 focus:ring-blue-300  items-center pl-7 pr-5 py-2.5 rounded-lg text-white justify-center gap-1`}>

                            <span className="z-40">Actualizar hash</span>
                            <IoIosArrowForward size={20} className='transition-all duration-300 group-hover:translate-x-1' />

                            <div
                                className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
                            </div>
                        </button>

                    </div>

                </div>
                    <span className="text-red-500 flex items-center ">{errorMessage}</span>

            </div>




        </form>
    )
}
