import { Suspense } from 'react';
import { Paypal } from '@/components';

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ({ searchParams }: Props) {
    const payment = searchParams?.payment as string;
    
    // TODO mejorar interfaz ingreso de orden id para ver en paypal
    if (!payment) {
        return (
            
            <div className='h-[calc(100vh-260px)] flex justify-center'>Ingrese un Nº de orden para verificar el pago en paypal</div>
        );
    };
    return (
        // TODO implementar skeleton cargando resultados de paypal
        <div className='h-[calc(100vh-260px)]'>

            <Suspense fallback={<div>Cargando detalles paypal...</div>} >
                <Paypal orderId={payment}/>
            </Suspense>
        </div>
    );
}