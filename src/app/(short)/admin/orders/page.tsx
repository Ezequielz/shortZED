import { Suspense } from 'react';
import { Orders, OrdersInfo, Search, Title } from '@/components';

interface Props {
  searchParams?: { [key: string]: string | undefined };
};

export default async function ({ searchParams }: Props) {

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.admsearch;
  const short = searchParams?.short as string;

  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">
      <Title title={"Administracion de Ordenes"} />
      {/* TODO implementar skeleton ordenes */}
      <Suspense fallback={<div>Cargando ordenes...</div>}>
        <div className="flex gap-2">

          <OrdersInfo>
            <Search bg="bg-amber-800" label="Orden" paramsName="admsearch" />
          </OrdersInfo>

        </div>
        <Orders page={page} search={search} short={short} />

      </Suspense>
    </div>
  );
}