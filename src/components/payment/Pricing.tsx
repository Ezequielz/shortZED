import Link from 'next/link'
import prisma from '@/lib/prisma';
import clsx from 'clsx';
import { PricingButton } from './PricingButton';
import { currencyFormat } from '@/helpers';

interface Props {
    short: string
}

export const Pricing = async ({ short }: Props) => {

    const plans = await prisma.plan.findMany()
    const resaltPlan = 'popular'

    return (

        <div className="flex flex-col md:flex-row justify-center  ">

            {

                plans.filter(p => p.name !== 'free').map(plan => (
                    <div
                        key={plan.id}
                        className={
                            clsx(
                                "py-12 sm:py-12 md:py-4 px-4 z-30 w-fit ",
                                { 'bg-gray-50': plan.name !== resaltPlan },
                                { ' bg-purple-500 transform scale-1 sm:scale-1 md:scale-105 lg:scale-105 xl:scale-105 z-40  shadow-none sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl': plan.name === resaltPlan }
                            )
                        }
                    >
                        <h1 className={
                            clsx(
                                "text-gray-500 font-semibold text-xl capitalize",
                                { 'text-purple-200 ': plan.name === resaltPlan },
                                { 'text-gray-500 ': plan.name !== resaltPlan },

                            )
                        }
                        >
                            {plan.name}</h1>
                        <div className="text-center py-4 px-2">
                            <h1 className={
                                clsx(
                                    " text-4xl font-black",
                                    { "text-white": plan.name === resaltPlan },
                                    { "text-gray-700": plan.name !== resaltPlan }


                                )
                            }
                            >{currencyFormat(plan.price)}</h1>
                            <p className={
                                clsx(
                                    " mt-2",
                                    { "text-white text-opacity-50 ": plan.name === resaltPlan },
                                    { "text-gray-500 ": plan.name !== resaltPlan },

                                )
                            }
                            >Mensual</p>

                        </div>
                        <div className={
                            clsx(
                                "h-px ",
                                { "bg-purple-400": plan.name === resaltPlan },
                                { "bg-gray-200": plan.name !== resaltPlan },
                            )
                        }
                        />
                        <div className="text-center mt-3">
                            <p className={
                                clsx(
                                    "text-sm ",
                                    {"text-white text-opacity-80": plan.name === resaltPlan },
                                    {"text-gray-400": plan.name !== resaltPlan },
                                )
                            }
                            >
                                {plan.limit ? `+${plan.limit} clicks ` : 'Sin límites '}

                            </p>
                        </div>

                        <div className='flex justify-center'>

                            <PricingButton planNAme={plan.name} short={short} resaltPlan={resaltPlan} />
                        </div>
                    </div>

                ))
            }
 


        </div >

    )
}
