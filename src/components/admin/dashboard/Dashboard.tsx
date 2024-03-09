
import { Suspense } from "react";
import { PanelCodes, PanelLinks, PanelOrders, PanelPlans, PanelUsers } from "./panels";

const panels = [
    {
        label: "Users",
        component: <PanelUsers />
    },
    {
        label: "Links",
        component: <PanelLinks />
    },
    {
        label: "Orders",
        component: <PanelOrders />
    },
    {
        label: "Plans",
        component: <PanelPlans />
    },
    {
        label: "Codes",
        component: <PanelCodes />,
    }
]


export const Dashboard = async () => {

     
    return (
        <div className="p-6 grid gap-10 md:grid-cols-2 xl:grid-cols-3 ">

            {
                // TODO implementar esqueleton paneles
                panels.map((panel, index) => (

                    <Suspense key={index} fallback={ <div>cargando {panel.label}</div> }>
                        {panel.component}
                    </Suspense>
                ))
            }

        </div>
    )
}
