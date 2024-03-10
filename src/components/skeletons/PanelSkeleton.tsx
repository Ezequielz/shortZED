import React from "react"


interface Props {
    icon: React.ReactNode;
    label: string;
    bgColor: string;
    hover: string;
}
export const PanelSkeleton = ({ icon, label, bgColor, hover }: Props) => {
    return (
        <div

            className={`${hover} relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md  `}
        >
            <div className={`${bgColor}  bg-clip-border mx-4 rounded-xl overflow-hidden  text-white  shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}>
                {icon}
            </div>
            {/* <TopInfo label='codigos' totalCount={totalCodesCount} /> */}
            <div className="p-4 flex flex-col justify-end items-end">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de {label}</p>
                <h3 className="animate-pulse bg-slate-500/50 rounded-lg h-10 w-10 "></h3 >
            </div>

            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">
                <div className="flex flex-col items-center" >

                </div>

                <div className="flex flex-col items-center">
                    <h4 className="font-normal">Estado</h4>
                    <ul>
                        <li className="flex justify-center items-center gap-1">
                            Activos: <span className="animate-pulse bg-slate-500/50 rounded-sm h-3 w-5 "></span>
                        </li>
                        <li className="flex justify-center items-center gap-1">
                            Inactivos: <span className="animate-pulse bg-slate-500/50 rounded-sm h-3 w-5 "></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
