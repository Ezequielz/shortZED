import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { OrdersSkeleton, TableOrders, Title } from '@/components';

export default async function () {

  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  };


  return (
    <section>
      <Title title={'Ordenes'} />
      <Suspense fallback={<OrdersSkeleton items={7} />}>
        <TableOrders />
      </Suspense>
    </section>
  );
}