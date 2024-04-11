
import { Suspense } from "react";
import { PanelCodes, PanelLinks, PanelOrders, PanelPlans, PanelUsers } from "./panels";
import { PanelSkeleton } from "@/components";
import { ImBarcode } from "react-icons/im";
import { IoCardOutline, IoLinkOutline, IoPersonOutline } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";
import { PanelPayment } from "./panels/PanelPayment";
import { BsPaypal } from "react-icons/bs";

const panels = [
    {
        label: "usuarios",
        component: <PanelUsers />,
        icon: <IoPersonOutline size={30} />,
        bgColor: 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40',
        hover: ' hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 hover:text-white'
    },
    {
        label: "Links",
        component: <PanelLinks />,
        icon: <IoLinkOutline size={30} />,
        bgColor: 'bg-gradient-to-tr from-green-600 to-green-400 shadow-green-500/40',
        hover: ' hover:bg-gradient-to-tr hover:from-green-600 hover:to-green-400 hover:text-white'
    },
    {
        label: "Orders",
        component: <PanelOrders />,
        icon: <IoCardOutline size={30} />,
        bgColor: 'bg-gradient-to-tr from-amber-600 to-amber-400 shadow-amber-500/40',
        hover: ' hover:bg-gradient-to-tr hover:from-amber-600 hover:to-amber-400 hover:text-white'
    },
    {
        label: "Plans",
        component: <PanelPlans />,
        icon: <MdCurrencyExchange size={30} />,
        bgColor: 'bg-gradient-to-tr from-rose-600 to-rose-400 shadow-rose-500/40',
        hover: ' hover:bg-gradient-to-tr hover:from-rose-600 hover:to-rose-400 hover:text-white'
    },
    {
        label: "Codes",
        component: <PanelCodes />,
        icon: <ImBarcode size={30} />,
        bgColor: 'bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 shadow-fuchsia-500/40',
        hover: ' hover:bg-gradient-to-tr hover:from-fuchsia-600 hover:to-fuchsia-400 hover:text-white'
    },
    {
        label: "Payment",
        component: <PanelPayment />,
        icon: <BsPaypal size={30} />,
        bgColor: 'bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-emerald-500/40',
        hover: ' hover:bg-gradient-to-tr hover:from-emerald-600 hover:to-emerald-400 hover:text-white'
    }

]


export const Dashboard = async () => {


    return (
        <div className="p-6 grid gap-10 md:grid-cols-2 xl:grid-cols-3 ">

            {
              
                panels.map((panel, index) => {
                    const { component, ...skeletonProps } = panel
                    return (
                        <Suspense key={index} fallback={<PanelSkeleton {...skeletonProps} />}>
                            {panel.component}
                          
                        </Suspense>

                    )
                })
            }

        </div>
    )
}
