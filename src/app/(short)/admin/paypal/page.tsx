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
            <div>Ingrese un Nº de orden para verificar el pago en paypal</div>
        );
    };
    return (
        // TODO implementar skeleton cargando resultados de paypal
        <Suspense fallback={<div>Cargando detalles paypal...</div>} >
            <Paypal orderId={payment}/>
        </Suspense>
    );
}