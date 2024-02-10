'use client'

import { useState } from 'react';

import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import Link from "next/link"

// import { login, registerUser } from "@/actions";

type FormInputs = {
    name: string;
    email: string;
    password: string;
};

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i


export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        // setErrorMessage('')
        // const { name, email, password } = data;

        // // Server action
        // const resp = await registerUser(name, email, password)
        // if (!resp.ok) {
        //     setErrorMessage(resp.message)
        //     return;
        // }

        // await login( email.toLowerCase(), password );

        // window.location.replace('/')

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">


            <label htmlFor="email">Nombre completo</label>
            {errors.name?.type === 'required' && (
                <span className="text-red-500">*El nombre es obligatorio</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Correo electrónico</label>
            {errors.email?.type === 'required' && (
                <span className="text-red-500">*El email es obligatorio</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: emailRegex })}
            />


            <label htmlFor="email">Contraseña</label>
            {errors.password?.type === 'required' && (
                <span className="text-red-500">*La contraseña es obligatoria</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            <span className="text-red-500">{errorMessage}</span>

            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-slate-300"></div>
                <div className="px-2 text-slate-100">O </div>
                <div className="flex-1 border-t border-slate-300"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}