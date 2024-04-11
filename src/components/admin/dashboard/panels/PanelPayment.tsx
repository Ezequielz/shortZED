import Link from 'next/link';
import { BsPaypal } from 'react-icons/bs';
import { IoCardOutline } from 'react-icons/io5';

export const PanelPayment = async () => {

    return (
        <Link
            href={'/admin/paypal'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-emerald-600 hover:to-emerald-400 hover:text-white"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <BsPaypal size={30} />
            </div>
            <div className="flex justify-center items-center h-full min-h-20 font-sans text-sm leading-normal font-normal text-blue-gray-600">

                Control de pagos
            </div>
        </Link>
    )
}
