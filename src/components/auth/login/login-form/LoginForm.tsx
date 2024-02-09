/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link'
import clsx from 'clsx';
import { IoInformationOutline } from 'react-icons/io5';

// import { authenticate } from '@/actions';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {

    // const [state, dispatch] = useFormState(authenticate, undefined);
    const router = useRouter();

    // useEffect(() => {
    //   if ( state === 'Success' ) {
    //     // router.replace('/')
    //     window.location.replace('/')
    //   }
    // }, [state])
    

    return (
        <form className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name='email'
            />


            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name='password'
            />

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {/* {state === 'Invalid credentials' && (
                    <div className='flex mb-2'>
                        <IoInformationOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">Credenciales no son correctas</p>
                    </div>
                )} */}
            </div>

            <LoginButton />


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/register"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            disabled={ pending }
            className={ clsx({
                "btn-primary": !pending,
                "btn-disabled": pending
            })}>
            Ingresar
        </button>
    );
}