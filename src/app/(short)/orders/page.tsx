import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { OrdersSkeleton, TableOrders, Title, UserOrders } from '@/components';
import { Metadata } from 'next';

interface Props {
  searchParams?: { [key: string]: string | undefined }
}
export async function generateMetadata(
): Promise<Metadata> {

  const session = await auth();
  return {
    title: 'Ordenes ',
    description: `Ordenes del usuario ${session?.user?.name}`,
  }
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
        <UserOrders page={page} status={status} />
      </Suspense>
    </section>
  );
}