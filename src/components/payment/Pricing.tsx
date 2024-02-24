import React from 'react'

export const Pricing = () => {
    return (

        <div className="flex flex-col sm:flex-col md:flex-row justify-center items center    ">
            <div className="py-12 sm:py-12 md:py-4 px-4 w-full sm:w-full bg-white z-30">
                <h1 className="text-gray-500 font-semibold text-xl ">Basico</h1>
                <div className="text-center py-4 px-2">
                    <h1 className="text-gray-700 text-4xl font-black">$10.00</h1>
                    <p className="text-gray-500  mt-2">Mensual</p>

                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="text-center mt-3">
                    <p className="text-sm text-gray-400">
                        -100 clicks de limite 
                    </p>
                </div>
                <button className="w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-700 hover:shadow-xl duration-200 hover:bg-gray-800">Activar</button>
            </div>
            <div className="py-12 sm:py-12 md:py-4 px-4 w-full sm:w-full bg-purple-500 transform scale-1 sm:scale-1 md:scale-105 lg:scale-105 xl:scale-105 z-40  shadow-none sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl">
                <h1 className="text-purple-200 font-semibold text-xl ">Popular</h1>
                <div className="text-center py-4 px-2">
                    <h1 className="text-white text-4xl font-black">$20.00</h1>
                    <p className="text-white text-opacity-50 mt-2">Mensual</p>

                </div>
                <div className="h-px bg-purple-400"></div>
                <div className="text-center mt-3">
                    <p className="text-sm text-white text-opacity-80">
                        -300 clicks de limite 
                    </p>
                </div>
                <button className="w-full mt-6 mb-3 py-2 text-white font-semibold bg-purple-400 hover:shadow-xl duration-200 hover:bg-purple-800">Activar</button>
            </div>
            <div className="py-12 sm:py-12 md:py-4 px-4 w-full sm:w-full bg-white z-30">
                <h1 className="text-gray-500 font-semibold text-xl ">Empresarial</h1>
                <div className="text-center py-4 px-2">
                    <h1 className="text-gray-700 text-4xl font-black">$50.00</h1>
                    <p className="text-gray-500  mt-2">Mensual</p>

                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="text-center mt-3">
                    <p className="text-sm text-gray-400">
                        -clicks ilimitados!
                    </p>
                </div>
                <button className="w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-700 hover:shadow-xl duration-200 hover:bg-gray-800">Activar</button>
            </div>
        </div>

    )
}
