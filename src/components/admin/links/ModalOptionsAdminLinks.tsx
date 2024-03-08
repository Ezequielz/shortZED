'use client'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { getLinkBySlug, updateLinkByAdmin } from '@/action';
import { dateFormat } from '@/helpers';
import { useUIStore } from '@/store';

interface Props {
    short: string;
};

interface FormInputs {
    url?: string;
    shortUrl?: string;
    isActive: boolean;
    limit?: number | null;
    expires?: string | Date;
};


export const ModalOptionsAdminLinks = ({ short }: Props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [link, setLink] = useState<FormInputs>();
    const closeDialog = useUIStore(state => state.closeDialog)
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<FormInputs>();

    useEffect(() => {
        const getLink = async () => {
            const { links } = await getLinkBySlug(short);

            const link = links![0];
            return link;

        };

        getLink().then(res => {

            const { url, shortUrl, isActive, limit, expires, ...rest } = res;

            const [dia, mes, año] = dateFormat(expires).split('/');

            const newExpires = `${año}-${mes}-${dia}`; // 20/04/2024 a 2024-04-20

            const link = { url, shortUrl, isActive, limit, expires: newExpires };
            setLink(link);
            setIsLoading(false);
        });

    }, [short]);

    useEffect(() => {

        if (link) {
            setValue('url', link.url);
            setValue('shortUrl', link.shortUrl);
            setValue('isActive', link.isActive);
            setValue('limit', link.limit);
            setValue('expires', link.expires);

        };

    }, [setValue, link]);




    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { url, shortUrl, isActive, limit, expires } = data;

        const {ok, message } = await updateLinkByAdmin({
            url,
            shortUrl,
            isActive: typeof (isActive) === 'string' && isActive === 'true' ? true : false,
            limit: limit ? +limit : null,
            expires: new Date(expires!)
        }, short);

        
        if (ok) {
            enqueueSnackbar('link actualizado', { variant: "success" })
        } else {
            enqueueSnackbar(message, { variant: "error" })
        }

        closeDialog()
        // console.log(message)

    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-neutral-900 p-4 m-2 max-w-[1200px] mb-6 flex flex-col gap-2 items-center justify-center">
            <input
                type="text"
                className='p-2 rounded-md w-full'
                // placeholder={initialState.url || 'url'}
                {...register('url', { required: true })}
            />
            <div className='flex flex-row gap-2 items-center justify-center'>
                <div className='flex flex-col gap-2 '>

                    <input
                        type="text"
                        className='p-2 rounded-md'
                        // placeholder={initialState!.shortUrl || 'short url'}

                        {...register('shortUrl', { required: true })}
                    />
                    <input
                        type="number"
                        className='p-2 rounded-md'
                        // placeholder={initialState!.limit?.toString() || 'limite de uso'}
                        {...register('limit', { required: true })}
                    />

                </div>
                <div className='flex flex-col gap-2 text-neutral-900'>
                    <select
                    className='p-2 rounded-md'
                        {...register('isActive', { required: true })}
                    >
                        <option value={'true'} selected={link?.isActive} >Activo</option>
                        <option value={'false'} selected={!link?.isActive}>Inactivo</option>
                    </select>

                    <input
                        type="date"
                        className='p-2 rounded-md'
                        // value={link!.expires! as string}
                        // value='2024-03-19'
                        // placeholder={dateFormat(initialState!.expires!) || 'fecha de expiración'}
                        {...register('expires', { required: true })}
                    />

                </div>

            </div>
            <button className='p-2 bg-violet-600 m-2 rounded-md hover:bg-violet-700 text-slate-100'>
                Guardar
            </button>

        </form>
    )
}
