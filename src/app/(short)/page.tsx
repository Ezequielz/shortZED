

import { ShortForm, TableSkeleton, Title, ViewLink } from '@/components';
import { Suspense } from 'react';


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
};
export default async function Home({ searchParams }: Props) {

  const short = searchParams?.short as string;
  const columns = ['Url','Short url','Estado', 'Clicks','Limite','Short','Qr', 'Editar','Eliminiar']
  return (
    <>
      <Title title={"Acortador de URL"} />

      <ShortForm />

      {
        short && (
          <Suspense fallback={ <TableSkeleton items={1} columns={columns} /> }>

            <ViewLink short={short} />
          </Suspense>
      
        )
      }

    </>
  );
}
