'use client'

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerUser, setCode } from '@/action';
import { enqueueSnackbar } from 'notistack';

type FormInputs = {
    name: string;
    discount: number;
};


export const CodeAddForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('');

        const { name, discount } = data;
        // Server action    


        const resp = await setCode({ name, discount: +discount });

        if (!resp.ok) {
            setErrorMessage(resp.message)
            enqueueSnackbar('Error al crear código', { variant: "error" })
            return;
        };

        enqueueSnackbar(`Código ${name} creado`, { variant: "success" })

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" flex items-center w-full">
            <span className="text-red-500">{errorMessage}</span>
            <div className="flex flex-col md:flex-row gap-2 items-center w-full">
                <div className='w-3/4'>


                    <input
                        type="text"
                        placeholder="Nombre de código"
                        className="w-full  py-1.5 border bg-gray-200 rounded  text-slate-800"
                        {...register('name', { required: true, minLength: 3 })}
                    />
                    <div className='relative'>

                        {errors.name?.type === 'required' && (
                            <span className="absolute top-0 bg-red-500 text-sm py-0.5 px-2 text-white rounded-lg">*El nombre es obligatorio</span>
                        )}
                        {errors.name?.type === 'minLength' && (
                            <span className="absolute top-0 bg-red-500 py-0.5 px-2 text-sm text-white rounded-lg">*El nombre debe tener al menos 3 caracteres</span>
                        )}
                    </div>

                </div>


                <div>

                    <input
                        placeholder="Descuento"
                        className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800"
                        type="number"
                        max={100}
                        min={1}
                        {...register('discount', { required: true, min: 1, max: 100 })}
                    />
                    <div className='relative'>

                        {errors.discount?.type === 'required' && (
                            <span className="absolute top-0 bg-red-500 text-sm py-0.5 px-2 text-white rounded-lg">*El descuento es obligatorio</span>
                        )}
                        {errors.discount?.type === 'min'  && (
                            <span className="absolute top-0 bg-red-500 text-sm py-0.5 px-2 text-white rounded-lg">*Descuento minimo 1%</span>
                        )}
                        { errors.discount?.type === 'max'  && (
                            <span className="absolute top-0 bg-red-500 text-sm py-0.5 px-2 text-white rounded-lg">*Descuento máximo 100% </span>
                        )}
                    </div>

                </div>



            </div>
            <button
                type="submit"
                className="px-4 py-2 rounded-xl  mx-2 bg-fuchsia-800 hover:bg-fuchsia-600 h-fit ">
                Crear
            </button>

        </form>

    )
}
