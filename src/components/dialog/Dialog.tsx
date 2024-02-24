'use client'
import { useUIStore } from "@/store";
import { clsx } from "clsx";


interface Props {
    children?: React.ReactNode;
}

export const Dialog = ({ children }: Props) => {
    const dialog = useUIStore(state => state.dialog)
    const closeDialog = useUIStore(state => state.closeDialog)
   
    return (
        <div
            className={
                clsx(
                    "",
                    {
                        "hidden": !dialog
                    }
                )
            }>


            {/* Blur */}

            <div
                onClick={closeDialog}
                className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            />
            <div className="rounded-lg fixed px-5 py-4  w-fit h-fit  m-auto inset-x-0 inset-y-0 text-slate-100 bg-neutral-800 z-20 shadow-2xl  transition-all duration-300">

                {children}
            </div>


        </div>
    );
};
