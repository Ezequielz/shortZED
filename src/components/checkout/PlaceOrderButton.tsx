import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

export const PlaceOrderButton = () => {
    const isSubmitting = false
    
    return (

        <div className="flex w-fit m-auto justify-center flex-col">

            <button
                disabled={isSubmitting}
                className={`
                ${isSubmitting && 'btn-disabled'} 
                inline-flex mt-2 group relative overflow-hidden bg-violet-600 focus:ring-4 focus:ring-blue-300  items-center pl-7 pr-5 py-2.5 rounded-lg text-white justify-center gap-1`}>

                <span className="z-5">Confirmar</span>
                <IoIosArrowForward size={20} className='transition-all duration-300 group-hover:translate-x-1' />

                <div
                    className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
                </div>
            </button>

        </div>
    )
}
