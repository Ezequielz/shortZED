

import { Main, TableSkeleton, Title, ViewLink } from '@/components';
import { subtitleFont } from '@/components/config/fonts';
import { Suspense } from 'react';


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
};
export default async function Home({ searchParams }: Props) {

  const short = searchParams?.short as string;
  const columns = ['Url','Short url','Estado', 'Clicks','Limite','Short','Qr', 'Editar','Eliminiar']
  return (
    <div className=''>
      <Title title={"Acortador de URL"} className='text-3xl sm:text-5xl lg:text-7xl bg-gradient-to-r from-blue-600 via-violet-500 to-violet-400 inline-block text-transparent bg-clip-text' />
      <h2 className={`${ subtitleFont.className } flex justify-center text-sm sm:text-lg lg:text-xl tracking-wide lg:tracking-[.3em] font-extralight opacity-50`}>Transforma tus Enlaces con Estilo</h2>
    
      <Main />

      

      {
        short && (
          <Suspense fallback={ <TableSkeleton items={1} columns={columns} /> }>

            <ViewLink short={short} />
          </Suspense>
      
        )
      }

    </div>
  );
}
