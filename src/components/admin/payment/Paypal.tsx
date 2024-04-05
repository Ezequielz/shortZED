import { paypalPayment } from '@/action';
import { OrderPaypalDetails } from './OrderPaypalDetails';
import { currencyFormat } from '@/helpers';

interface Props {
    orderId: string;
};

export const Paypal = async ({ orderId }: Props) => {

    const { ok, message, resp: orderPaypal, orderExist } = await paypalPayment(orderId);


    if (!ok) {
        return (
            <div>{message}</div>
        );
    };

    const ordenDetail = {
        link: orderExist?.link.url,
        Plan_elegido: orderExist?.plan.name,
        Precio_total: currencyFormat(orderExist!.total),
    }
    const orderUser = {
        Nombre: orderExist?.user.name,
        Email: orderExist?.user.email,
    }

    const PaypalResponse = {
        Estado: (orderPaypal?.status === 'COMPLETED' ? 'Pagado' : 'Pendiente de pago') ?? '',
        Nombre: orderPaypal?.payment_source ? (orderPaypal?.payment_source?.paypal.name.given_name + ' ' + orderPaypal?.payment_source?.paypal.name.surname) : '-',
        Email: orderPaypal?.payment_source ? (orderPaypal?.payment_source?.paypal.email_address) : '-',
    }

  
    return (
        <div className='grid grid-cols-2 p-2'>

            <div className='bg-neutral-800 p-4 rounded-lg z-20'>
                <h2 className='font-bold flex justify-center'>Resumen</h2>
                <div className='flex flex-row gap-2 '>

                    <div className='flex flex-col text-sm p-2 w-3/5'>
                        <h3 className='font-semibold bg-white text-emerald-600'>
                            Orden
                        </h3>
                        <span className='text-[12px] font-thin'>{orderExist?.id}</span>
                        <h3 className='font-semibold bg-white text-emerald-600'>Creado por</h3>
                        {
                            Object.entries(orderUser).map(([key, value]) => (
                                <div key={key} className='p-1 flex justify-between gap-2 items-center'>
                                    <span>{key}:</span>
                                    <span className='text-sm font-extralight'>{value}</span>
                                </div>
                            ))
                        }
                        <h4 className='font-semibold bg-white text-emerald-600'>Detalles de la orden</h4>
                        {
                            Object.entries(ordenDetail).map(([key, value]) => (
                                <div key={key} className='p-1 flex justify-between gap-2 items-center'>
                                    <span>{key}:</span>
                                    <span className='text-sm font-extralight'>{value}</span>
                                </div>
                            ))
                        }

                    </div>

                    <div className='flex flex-col p-2 w-2/5'>
                        <h4 className='font-semibold bg-white text-emerald-600'>Repuesta de paypal</h4>
                        {
                            Object.entries(PaypalResponse).map(([key, value]) => (
                                <div key={key} className='flex justify-between gap-2 items-center p-1'>
                                    <span>{key}:</span>
                                    <span className='text-sm font-extralight'>{value}</span>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            <div className=' px-5'>
                <h2 className='font-bold flex justify-center '>Repuesta de Paypal</h2>
                <div className="fixed w-full max-h-96 overflow-y-auto z-10 ">

                    <OrderPaypalDetails orderPaypal={orderPaypal} />
                </div>

            </div>

        </div>

    )
}
