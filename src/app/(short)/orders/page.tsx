import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { OrdersSkeleton, TableOrders, Title } from '@/components';

interface Props {
  searchParams?: { [key: string]: string | undefined }
}


export default async function ({ searchParams }: Props) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const status = searchParams?.status ? searchParams?.status : undefined;

  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  };


  return (
    <section>
      <Title title={'Ordenes'} />
      <Suspense fallback={<OrdersSkeleton items={7} />}>
        <TableOrders page={page} status={status}/>
      </Suspense>
    </section>
  );
}