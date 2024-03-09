import { getPlanByName } from "@/action";
import { currencyFormat } from "@/helpers";
import { PlanName } from "@prisma/client";

interface Props {
    planName: PlanName;
}

export const ModalPlanInfo = async ({ planName }: Props) => {
    const { ok, plan } = await getPlanByName(planName);

    if (!plan || !ok) return null;

    const { price, limit } = plan;
    const object = {
        Precio: currencyFormat(price),
        Límite: limit ? limit : '∞'
    };
    return (
        <ul className="w-full ">
            {
                Object.entries(object).map(([prop, value]) => (
                    <li key={prop} className="p-2 flex justify-between odd:bg-neutral-600 even:bg-neutral-500">
                        <span>{prop}:</span>
                        {
                            typeof (value) === 'string' && value.length > 30 ? (

                                <span className="w-[350px] break-words text-xs text-right">{value.length > 150 ? value.slice(0, 150) + '...' : value}</span>
                            ) : (

                                <span className="">{value}</span>
                            )
                        }
                    </li>
                ))
            }

        </ul>
    )
}
