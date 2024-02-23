import React from 'react'

export const StatusLinksSeleton = () => {
    return (
        <section className="flex flex-wrap -mx-6 animate-pulse">
            <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 rounded-full"></div>
                    <div className="mx-5">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
                    </div>
                </div>
            </div>
            <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 rounded-full"></div>
                    <div className="mx-5">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
                    </div>
                </div>
            </div>
            <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 rounded-full"></div>
                    <div className="mx-5">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
