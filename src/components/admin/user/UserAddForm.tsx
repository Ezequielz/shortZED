'use client'

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerUser } from '@/action';
import { enqueueSnackbar } from 'notistack';

type FormInputs = {
    name: string;
    email: string;
    password: string;
    // image?: string | null;
};

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

export const UserAddForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        console.log('fgvfg')
        setErrorMessage('');
        //TODO guardar una imagen en el usuario con cloudinary
        const { name, email, password, 
            // image
         } = data;
        // Server action    

        const resp = await registerUser(name, email, password,
            // image
            )

        // console.log({image})
        if (!resp.ok) {
            setErrorMessage(resp.message)
            enqueueSnackbar('Error al crear usuario', { variant: "error" })
            return;
        };
        
        enqueueSnackbar('usuario creado', { variant: "success" })
        // window.location.replace('/');

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" flex items-center">
            <div className="grid md:grid-cols-2 gap-2 items-center">

                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800"
                    {...register('name', { required: true })}
                />


                <input
                    placeholder="Email"
                    className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800"
                    type="email"
                    {...register('email', { required: true, pattern: emailRegex })}
                />


                <input
                    placeholder="Password"
                    className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800"
                    autoComplete='off'
                    type="password"
                    {...register('password', { required: true, minLength: 6 })}
                />

                <input
                    placeholder=""
                    className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800"
                    type="file"
                    // {...register('image')}
                />



            </div>
            <button
                onClick={ ()=>console.log('LL')}
                type="submit"
                className="px-4 py-2 rounded-xl  mx-2 bg-blue-800 hover:bg-blue-600 h-fit ">
                Crear
            </button>

        </form>

    )
}
