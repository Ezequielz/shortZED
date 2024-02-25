/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState } from 'react';
import Link from 'next/link'
import { SignInOptions } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';


import { login, providerLogin } from '@/action';

type FormInputs = {
    email: string;
    password: string;
};

export const LoginForm = () => {

    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { email, password } = data;

        // Server action
        const resp = await login(email.toLowerCase(), password)
        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        };

        await login(email.toLowerCase(), password);

        window.location.replace('/');

    };

    const oauthLogin = async () => {
        setErrorMessage('');

        try {
            let options: SignInOptions = {
                callbackUrl: `${window.location.origin}`,
                // redirect: false,
            };

            if (!options) return setErrorMessage(options);
            await providerLogin('google', options);

        } catch (error) {
            console.log(error);
            setErrorMessage('error');
            throw error;
        };


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        { 'border-red-500': errors.password }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: emailRegex })}

            />
            {errors.email?.type === 'required' && (
                <span className="text-red-500">*El email es obligatorio</span>
            )}


            <label htmlFor="email">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        { 'border-red-500': errors.password }
                    )
                }
                autoComplete='off'
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === 'required' && (
                <span className="text-red-500">*La contraseña es obligatoria</span>
            )}
            {errors.password?.type === 'minLength' && (
                <span className="text-red-500">*La contraseña debe tener al menos 6 caracteres</span>
            )}


            <span className="text-red-500 mt-5">{errorMessage}</span>
            <button
                type='submit'
                disabled={isSubmitting}
                className={clsx({
                    "btn-primary": !isSubmitting,
                    "btn-disabled": isSubmitting
                })}>
                Ingresar
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-2">
                <div className="flex-1 border-t border-slate-300"></div>
                <div className="px-2 text-slate-100">O</div>
                <div className="flex-1 border-t border-slate-300"></div>
            </div>

            <div className="w-full  mb-10 lg:mb-0">
                <span className='text-red-500 text-sm'> {error === 'unauthorized' && 'Usuario baneado'} </span>
                <button
                    onClick={oauthLogin}
                    type="button"
                    className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
                        <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                        <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                        <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                        <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                    </svg> Ingresá con Google </button>
            </div>

            <div className='mt-5 flex gap-2 '>
                No tiene cuenta?

                <Link
                    href="/auth/register"
                    className="btn-secondary text-center text-violet-500 hover:text-violet-400">
                    Registrate acá
                </Link>
            </div>

        </form>
    )
};