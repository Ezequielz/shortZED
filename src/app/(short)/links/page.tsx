import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { LinksSkeleton, ModalLink, TableLinks, Title } from '@/components';
import { Suspense } from 'react';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function LinksPage({ searchParams }: Props) {
  const session = await auth();
  const short = searchParams?.short as string;

  if (!session || !session.user?.id) {
    redirect('/');
  };


  return (

    <section>

        <Title title={'Links'} />

        <Suspense fallback={<LinksSkeleton items={7} />}>
          <TableLinks short={short}/>
        </Suspense>
        
    </section>

  )
}