'use client'
import { useState } from 'react';
import { PaypalOrderStatusResponse } from '@/interfaces';


interface Props {
    orderPaypal: PaypalOrderStatusResponse | undefined
    space?: number;

}
export const OrderPaypalDetails = ({ orderPaypal, space = 1}: Props) => {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!orderPaypal) return null;

    

    return (
        <div  >
            {Object.entries(orderPaypal).map(([key, value], index) => (
                <div key={key} className={`ml-${space}`}>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleAccordion(index)}>
                        <strong>{key}:</strong>
                        {typeof value === 'object' && (
                            <span className="ml-2">{openIndex === index ? '[-]' : '[+]'}</span>
                        )}
                    </div>
                    {openIndex === index && typeof value === 'object' ? (
                        <OrderPaypalDetails orderPaypal={value} space={(space + 1)} />
                    ) : (
                        <div >

                            {typeof value === 'object' ? '...' : value}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
