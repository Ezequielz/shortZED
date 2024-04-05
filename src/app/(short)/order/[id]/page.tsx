
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { Alert, DeleteOrderButton, OrderCheckout, OrderCheckoutSkeleton, Title } from '@/components';
import { Metadata } from 'next';


interface Props {
    params: {
        id: string;
    };
}
export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {

    const session = await auth();
    return {
        title: `Orden ${params.id}`,
        description: `Ordenes del usuario ${session?.user?.name}`,
    }
}

export default async function ({ params }: Props) {
    const { id } = params

    const session = await auth();
    if (!session) {
        redirect('/auth/login')
    }


    return (

        <div className="min-w-screen h-fit mb-3 ">
            {/* TITULO */}
            <Alert />
            <div className="px-5">
                <div className="mb-2 flex justify-between items-center">
                    <Title title='Orden' />
                    
                    <DeleteOrderButton id={id} />

                </div>

            </div>
            <Suspense fallback={<OrderCheckoutSkeleton />}>
                <OrderCheckout id={id} />
            </Suspense>


        </div>

    );
}