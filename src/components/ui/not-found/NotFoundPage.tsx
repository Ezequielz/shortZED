import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const NotFoundPage = () => {
    return (

        <div className="mt-20 flex items-center justify-center w-full">
            <div className=" px-5 ">
                <div className="w-full relative items-center justify-center flex flex-col">
                    <div className="bg-[#FF6A3D] px-4 text-xl rounded -rotate-12 absolute top-10 left-20">
                        404 - Page Not Found
                    </div>
                    <Image
                        src="/imgs/roblox.png"
                        alt={'404 image'}
                        width={500}
                        height={500}
                        className='p-5'
                    />
                    <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                        Whoops! Lo sentimos mucho.
                    </p>


                    <Link
                        className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-violet-600 text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-opacity-50" 
                        href={'/'}                    >
                        Ir al Home
                    </Link>
                </div>

            </div>
        </div>
    )
}
