'use client'

import { useCheckoutStore } from "@/store";
import { PlanName } from "@prisma/client"
import clsx from "clsx"
import Link from "next/link"

interface Props {
    short: string;
    planNAme: PlanName;
    resaltPlan: PlanName;
}

export const PricingButton = ({ short, planNAme, resaltPlan }: Props) => {

    const changePlan = useCheckoutStore( state => state.changePlan )
    return (
        <Link
            onClick={() => changePlan(planNAme)}
            href={`/checkout/${short}`}
            className={
                clsx(
                    " px-4 mt-6  py-2 text-white font-semibold  hover:shadow-xl duration-200 ",
                    { "bg-purple-400  hover:bg-purple-800": planNAme === resaltPlan },

                    { "bg-gray-700 hover:bg-gray-800": planNAme !== resaltPlan },

                )
            }
        >
            Activar
        </Link>
    )
}
