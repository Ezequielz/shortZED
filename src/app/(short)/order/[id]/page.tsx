
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { DeleteOrderButton, OrderCheckout, Title } from '@/components';
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
            <div className="px-5">

                <div className="mb-2 flex justify-between items-center">
                    <Title title='Orden' />

                    <DeleteOrderButton id={id} />

                </div>

            </div>
            {/* TODO implementar esqueleton orden checkout id */}
            <Suspense fallback={<div>Cargando orden...</div>}>

                <OrderCheckout id={id} />
            </Suspense>


        </div>

    );
}