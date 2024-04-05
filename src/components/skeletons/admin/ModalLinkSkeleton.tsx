
export const ModalLinkSkeleton = () => {
    return (
        <div className="w-full px-2">

            <div className="animate-pulse bg-slate-500/50 rounded-sm h-10 w-full my-2 px-2 " />

            <div className="flex gap-2 my-1">
                <div className="animate-pulse bg-slate-500/50 rounded-sm h-8 w-3/5 " />
                <div className="animate-pulse bg-slate-500/50 rounded-sm h-8 w-2/5 " />

            </div>

            <div className="flex gap-2 my-2">
                <div className="animate-pulse bg-slate-500/50 rounded-sm h-8 w-3/5 " />
                <div className="animate-pulse bg-slate-500/50 rounded-sm h-8 w-2/5 " />

            </div>

            <div className="flex justify-center ">

                <button
                    disabled
                    className='p-2 animate-pulse bg-violet-600  rounded-md hover:bg-violet-700 text-slate-100'>
                    Espere...
                </button>
            </div>



        </div>
    )
}
