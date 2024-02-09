'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from "clsx";
import { setUrl } from '@/action';

interface FormInputs {
    url: string;
}

export const ShortForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

    //TODO especificar si es usuario o no , 
    const user = 'db988207-9d08-4600-b183-0a651b2e1d7b'

    const regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { url } = data;

        // server action
        const resp = await setUrl(url, user)
        if (!resp.ok) {
            setErrorMessage(resp.message)
            return;
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" max-w-[1200px] justify-center m-auto">

            <input
                type="text"
                autoFocus
                placeholder="Inerte URL que quiera acortar ej: https://mipaginaweb.com/prod?q=asfasdfdfsdf"
                className={
                    clsx(
                        "w-full  p-2 border rounded-md bg-gray-200 text-slate-800",
                        {
                            'border-red-500': errors.url,
                        }
                    )
                }
                {...register("url", { required: true, pattern: regexURL })}
            />
            {errors.url?.type === 'required' && (
                <span className="text-red-500">El url es obligatorio</span>
            )}
            {errors.url?.type === 'pattern' && (
                <span className="text-red-500">Debe ser un url válido</span>
            )}

            <span className="text-red-500">{errorMessage}</span>
            <div className="flex justify-center">
                <button
                    disabled={isSubmitting}
                    className={`${isSubmitting && 'btn-disabled'} mt-2 group relative overflow-hidden bg-violet-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center`}>
                    <span className="z-40">Acortar url</span>
                    <svg className="z-40 ml-2 -mr-1 w-3 h-3 transition-all duration-300 group-hover:translate-x-1" fill="currentColor"
                        viewBox="0 0 20 20" >
                        <path fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                    <div
                        className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
                    </div>
                </button>

            </div>

        </form>
    )
}
