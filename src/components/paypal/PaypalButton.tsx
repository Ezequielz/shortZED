'use client'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
// import { paypalCheckPayment, setTransactionId } from "@/actions";


interface Props {
    orderId: string;
    amount: number;
}


export const PaypalButton = ({orderId, amount}: Props) => {
    
    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmount = (Math.round(amount * 100)) / 100  // 123.23


    if ( isPending ) {
        return (
            <div className="animate-pulse mb-20">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-2" />
            </div>
        )
    }


    const createOrder = async(data: CreateOrderData , actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            purchase_units: [
                {
                    // invoice_id: orderId,
                    amount: {
                        value: `${ roundedAmount }`,
                    }
                }
            ]
        });

        console.log(transactionId)
        // console.log({transactionId})
        // guardar el ID en la orden en la base de datos
        // const { ok } = await setTransactionId( orderId, transactionId )
       

        // if ( !ok ) {
        //     throw new Error('No se pudo actualizar la orden');
        // }

        return transactionId
    }


    // const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
    //     // console.log('onApprove')
    //     const details = await actions.order?.capture();
    //     if ( !details ) return;
    //                           // transactionId
    //     await paypalCheckPayment( details.id );
    // }


  return (
    <div className="relative z-0">
        <PayPalButtons 
            createOrder={ createOrder }
            // onApprove={ onApprove }
        />
    </div>
  )
}