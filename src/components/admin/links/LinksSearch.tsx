'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuDelete } from "react-icons/lu";


type FormInputs = {
    search: string;
};

interface Props {
    label?: string;
    color?: string;
}

export const LinksSearch = ({label = '', color = 'black'}: Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const [search, setSearch] = useState('');
    const path = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const prevSearch = searchParams.get('search')
        if (prevSearch) {
            setSearch(prevSearch)
        
        }
    }, [searchParams])
    

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setSearch(data.search.toString().toLowerCase());
        const { search } = data;

        const params = new URLSearchParams(searchParams);
        if (!search) {
            params.delete('search');
            router.replace(`${path}${params}`);
            return;
        }
        params.delete('page');
        params.set('search', search.toString().toLowerCase());

        router.replace(`${path}?${params}`);

    };

    const cleanSearch = () => {
        setSearch('')
        reset();
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        params.delete('search');
        router.replace(`${path}?${params}`)
        return;
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {errors.search?.type === 'required' && !search && (
                <span className="bg-red-500 p-0.5 rounded-xl text-sm">*Introducir un nombre o email</span>
            )}
            {
                search && (

                    <span className="flex text-sm gap-1 items-center">
                        Resultados de:
                        <span
                            onClick={cleanSearch}
                            className="cursor-pointer flex gap-1 items-center bg-red-500 w-fit px-2 p-0.5 rounded-xl"
                        >
                            {search}
                            <LuDelete size={20} />

                        </span>
                    </span>

                )
            }
            <div className="w-full flex">

                <input type="search" className="w- px-4 py-1 text-gray-800 rounded-l-lg focus:outline-none"
                    placeholder="Buscar Link"
                    {...register('search', { required: true })}
                />
                <button type="submit" className="flex items-center bg-green-800 justify-center w-12 h-8 text-white rounded-r-lg">

                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>

            </div>
        </form>
    )
}
