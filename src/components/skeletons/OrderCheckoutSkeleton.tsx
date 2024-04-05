import { ImSpinner9 } from "react-icons/im";
import { IoCardOutline } from 'react-icons/io5'

export const OrderCheckoutSkeleton = () => {
    const ordenShow = {
        link_corto: '',
        link_original: '',
        limite_actual: '',
        clicks_usados: '',
        vencimiento: '',
        plan_elegido: '',
        sub_total: '',
        impuestos: '',
        descuento: '',
        total: '',
        usuario: '',
        email: '',
    }
    return (
        <div className="border-t border-b border-gray-200 w-full mt-2 lg:flex lg:flex-col items-start gap-2">
            {/* Detalles de la orden */}
            <div className='lg:flex justify-between items-center p-2 mb-2  w-full bg-slate-600 bg-opacity-50'
            >
                <h2 className="flex items-center gap-2"> Número de orden:  <ImSpinner9 className="animate-spin"/></h2>

                <span className="flex gap-1 items-center">
                    <IoCardOutline size={30} />
                   

                </span>

            </div>

            <ul className="w-full px-3 lg:w-3/5 lex flex-col md:flex-row md:justify-between item-center my-5">
                {
                    Object.entries(ordenShow).map(([prop, value]) => (
                        <li key={prop} className="p-2 flex text-sm justify-between items-center odd:bg-neutral-700">
                            <span className="capitalize">{prop.replace('_', ' ')}:</span>



                            <span className='bg-slate-600 animate-pulse h-4 w-10 rounded-lg' />



                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
