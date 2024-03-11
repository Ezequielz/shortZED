import { paypalPayment } from '@/action';

interface Props {
    orderId: string;
};

export const Paypal = async ({orderId}: Props) => {

    const { ok, message, resp } = await paypalPayment(orderId);
 
    if (!ok) {
        return (
            <div>{message}</div>
        );
    };

    //TODO Crear interfaz de vista del resultado de paypal
    return (
        <div className="lg:min-h-[355px]">

            {
                JSON.stringify(resp)
            }
        </div>
    )
}
