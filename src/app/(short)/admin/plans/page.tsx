import { Suspense } from 'react';
import { PlanSkeleton, Plans, Title } from '@/components';
import { PlanName } from '@prisma/client';


interface Props {
  searchParams?: { [key: string]: string | undefined }
}


export default function ({ searchParams }: Props) {
  const plan = searchParams?.plan as PlanName;
  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">
      <Title title={"Administracion de Planes"} />


      <Suspense fallback={<PlanSkeleton />}>

        <Plans plan={plan} />
      </Suspense>
    </div>
  );
}