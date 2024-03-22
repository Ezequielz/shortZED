import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import {  LinksSkeleton, TableLinks, Title, UserLinks } from '@/components';
import { Suspense } from 'react';
import { Metadata } from 'next';

interface Props {
  searchParams?: { [key: string]: string | undefined }
}

export async function generateMetadata(
): Promise<Metadata> {

  const session = await auth();
  return {
      title: `Links`,
      description: `Links del usuario ${session?.user?.name}`,
  }
}

export default async function LinksPage({ searchParams }: Props) {
  const session = await auth();
  const short = searchParams?.short as string;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const status = searchParams?.status ? searchParams?.status : undefined;
  if (!session || !session.user?.id) {
    redirect('/');
  };


  return (

    <section>

        <Title title={'Links'} />

        <Suspense fallback={<LinksSkeleton items={7} />}>
          <UserLinks short={short} page={page} status={status}/>
        </Suspense>
        
    </section>

  )
}