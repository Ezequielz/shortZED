import { Suspense } from 'react';
import { Paypal, PaypalPaymentDetailSkeleton } from '@/components';

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ({ searchParams }: Props) {
    const payment = searchParams?.payment as string;
    
    
    if (!payment) {
        return (
            
            <div className='h-[calc(100vh-260px)] flex justify-center'>Ingrese un Nº de orden para verificar el pago en paypal</div>
        );
    };
    return (
        <div className='h-[calc(100vh-260px)]'>

            <Suspense fallback={<PaypalPaymentDetailSkeleton />} >
                <Paypal orderId={payment}/>
                
            </Suspense>
        </div>
    );
}