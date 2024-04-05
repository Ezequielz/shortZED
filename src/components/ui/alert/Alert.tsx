
'use client'
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export const Alert = () => {
    const [show, setShow] = useState(true)
    
    if (!show) return null;

    return (

        <div className="bg-amber-400 p-2 rounded-lg flex items-center gap-1 w-fit m-auto ">
            <FiAlertTriangle size={30} />
            <strong>
                Esto es una simulación de pago, NO INGRESE con su cuenta oficial de Paypal.
            </strong>
            <IoClose 
                onClick={() => setShow(false)}
                className="cursor-pointer -mt-5 bg-white text-amber-500 rounded-full hover: " />
        </div>


    )
}
