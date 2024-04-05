import { ImSpinner9 } from "react-icons/im";

export const ModalPlanInfoSkeleton = () => {
    const object = {
        Precio: <ImSpinner9 />,
        Límite: <ImSpinner9 />
    };
    return (
        <ul className="w-full ">
            {
                Object.entries(object).map(([prop, value]) => (
                    <li key={prop} className="animate-pulse p-2 flex justify-between items-center odd:bg-neutral-600 even:bg-neutral-500">
                        <span>{prop}:</span>

                        <span className="animate-spin">
                         
                              {value}
                            
                        </span>
                    </li>
                ))
            }

        </ul>
    )
}
